import { LocationStrategy } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command, Game, ViewContext } from '../../../models';
import {
  getRoutePath,
  normalizeScmPath,
  extractRefOffset,
} from '../../../utils';
import { getDefaultExtension } from '../../../utils/extension';
import { ScmMap, ScriptFile } from '../model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'scl-scm-view',
  templateUrl: './scm-view.component.html',
  styleUrls: ['./scm-view.component.scss'],
  standalone: false,
})
export class ScmViewComponent implements OnChanges {
  private sanitizer = inject(DomSanitizer);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private locationStrategy = inject(LocationStrategy);

  @Input() code: ScriptFile = { base: 0, symbols: [], refs: [], lines: [] };
  @Input() commands: Command[] = [];
  @Input() overlay: Record<string, string> = {};
  @Input() scmMap: ScmMap | null = null;
  @Input() game!: Game;
  @Input() viewContext!: ViewContext;
  @Input() activeFragment?: string | null;
  @Input() showLineNumbers!: boolean;
  @Input() showOffsets!: boolean;
  @Input() adjustOffsets: number = 0;
  renderedHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('');

  private commandByName = new Map<string, Command>();
  private scmTargetPathByName = new Map<string, string>();
  private refsSet = new Set<number>();
  private readonly terminalInstructions = new Set([
    'RETURN',
    'RETURN_TRUE',
    'RETURN_FALSE',
    'RETURN_IF_TRUE',
    'RETURN_TRUE_IF_TRUE',
    'TERMINATE_THIS_SCRIPT',
    'GOTO',
  ]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commands']) {
      this.commandByName = new Map(
        (this.commands ?? []).map((command) => [command.name, command]),
      );
    }

    if (changes['scmMap']) {
      this.scmTargetPathByName.clear();
      for (const file of this.scmMap?.files ?? []) {
        this.scmTargetPathByName.set(file.name, file.path);
      }
    }

    if (changes['code']) {
      this.refsSet = new Set(
        (this.code?.refs ?? []).filter(
          (offset): offset is number => typeof offset === 'number',
        ),
      );
    }

    const shouldRebuildHtml = [
      'code',
      'commands',
      'overlay',
      'scmMap',
      'game',
      'viewContext',
      'activeFragment',
      'showLineNumbers',
      'showOffsets',
      'adjustOffsets',
    ].some((key) => !!changes[key]);

    if (shouldRebuildHtml) {
      this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.buildRenderedHtml(),
      );
    }
  }

  getDefaultExtension() {
    return getDefaultExtension(this.viewContext);
  }

  getCommandRail(command: Command): string | undefined {
    const commandId = command.id || command.name;
    if (!commandId) {
      return undefined;
    }

    return `extensions/${this.getDefaultExtension()}/${commandId}`;
  }

  private getRefHref(arg: number | string): string | null {
    const refKey = this.getRefKey(arg);
    if (!refKey || !this.scmMap) {
      return null;
    }

    // is this a local label reference?
    const absOffset = extractRefOffset(refKey);
    const relativeOffset = Number.parseInt(absOffset, 10) - this.code.base;
    if (this.refsSet.has(relativeOffset)) {
      return this.toCurrentHref({ fragment: 'label-' + absOffset });
    }

    const targetPath = this.scmTargetPathByName.get(refKey);
    if (!targetPath) {
      return null;
    }

    const route = getRoutePath(this.game, normalizeScmPath(targetPath));
    return this.toRouteHref(route);
  }

  getClass(arg: number | string): string {
    if (typeof arg === 'number') {
      return 'tok-num';
    }
    if (typeof arg === 'string') {
      let first = arg[0];

      switch (first) {
        case '"':
          return 'tok-str';
        case '$': {
          const refIndex = parseInt(arg.slice(1), 10);

          if (
            !isNaN(refIndex) &&
            refIndex >= 0 &&
            refIndex < this.code.symbols.length
          ) {
            let symbol = this.code.symbols[refIndex];
            if (symbol.startsWith('g.') || symbol.startsWith('l.')) {
              return 'tok-var';
            }
            if (symbol.startsWith('ref.')) {
              return 'tok-ref';
            }
          }
          return 'tok';
        }
        case '[':
        case '(':
        case ',':
          return 'tok-punct both-bind';
        case ']':
        case ')':
          return 'tok-punct left-bind';
        case '/': {
          if (arg[1] === '/') {
            return 'tok-comment';
          }
        }
      }
    }
    return 'tok';
  }

  private getRefKey(arg: number | string): string | null {
    const symbol = this.resolveSymbol(arg);
    if (!symbol?.startsWith('ref.')) {
      return null;
    }

    return symbol;
  }

  private resolveSymbol(arg: number | string): string | null {
    if (typeof arg !== 'string' || !arg.startsWith('$')) {
      return null;
    }

    const refIndex = Number.parseInt(arg.slice(1), 10);
    if (
      Number.isNaN(refIndex) ||
      refIndex < 0 ||
      refIndex >= this.code.symbols.length
    ) {
      return null;
    }

    return this.code.symbols[refIndex] ?? null;
  }

  private isRef(index: number): boolean {
    const line = this.code.lines[index];
    if (typeof line[0] !== 'number') {
      return false;
    }
    return this.refsSet.has(line[0]);
  }

  private isTerminalInstruction(name: string): boolean {
    return this.terminalInstructions.has(name);
  }

  private isUnreachableInstruction(index: number): boolean {
    return (
      !this.isRef(index) &&
      index > 0 &&
      index < this.code.lines.length &&
      this.isTerminalInstruction(this.code.lines[index - 1][2] as string) &&
      !['END', 'ELSE', 'CASE', 'DEFAULT'].includes(
        this.code.lines[index][2] as string,
      )
    );
  }

  private buildRenderedHtml(): string {
    const lines = this.code?.lines ?? [];
    if (!lines.length) {
      return '';
    }

    const idents = this.buildIdents();
    const parts: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineOffset = line[0];

      if (this.isRef(i) && typeof lineOffset === 'number') {
        const labelId = `label-${this.code.base + lineOffset}`;
        parts.push(
          `<a href="${this.escapeAttribute(
            this.toCurrentHref({ fragment: labelId }),
          )}" id="${this.escapeAttribute(labelId)}" class="tok-label tok-ref identifier">${this.escapeHtml(
            this.formatLabel(lineOffset),
          )}</a>`,
        );
      }

      // if (this.isUnreachableInstruction(i)) {
      //   parts.push('<div class="text-muted pt-3 pl-5">// unreachable</div>');
      // }

      const activeClass =
        this.activeFragment === this.getLineNumberAnchorId(i) ? ' active' : '';
      parts.push(`<div class="line-row${activeClass}">`);

      if (this.showLineNumbers) {
        const lineAnchorId = this.getLineNumberAnchorId(i);
        parts.push(
          `<div class="line-number"><a class="identifier" id="${lineAnchorId}" href="${this.escapeAttribute(
            this.toCurrentHref({ fragment: lineAnchorId }),
          )}">${i + 1}</a></div>`,
        );
      }

      if (this.showOffsets) {
        const copyText =
          lineOffset !== ''
            ? String(this.code.base + Number(lineOffset) + this.adjustOffsets)
            : '';
        parts.push(
          `<div class="text-muted line-offset pointer" data-copy-text="${this.escapeAttribute(
            copyText,
          )}" title="Click the offset number to copy to clipboard">${this.escapeHtml(copyText)}</div>`,
        );
      }

      parts.push('<div class="line-content">');
      parts.push(this.renderIndent(idents[i]));
      for (const arg of line.slice(2)) {
        parts.push(this.renderToken(arg));
        parts.push(' ');
      }
      parts.push('</div></div>');
    }

    return parts.join('');
  }

  private buildIdents(): number[] {
    const idents: number[] = [];
    let ident = 0;

    for (let i = 0; i < this.code.lines.length; i++) {
      const keyword = this.code.lines[i][2];
      idents[i] = ident;

      if (!keyword || typeof keyword !== 'string') {
        continue;
      }

      if (['IF', 'SWITCH', 'WHILE', 'REPEAT'].includes(keyword)) {
        idents[i] = ident;
        ident++;
      }

      if (['END', 'UNTIL'].includes(keyword)) {
        ident = Math.max(0, ident - 1);
        idents[i] = ident;
      }

      if (['THEN', 'ELSE', 'DO', 'CASE', 'DEFAULT'].includes(keyword)) {
        idents[i] = ident - 1;
      }
    }

    return idents;
  }

  private renderToken(arg: number | string): string {
    if (arg !== '' && typeof arg === 'string') {
      const command = this.commandByName.get(arg);
      if (command) {
        const classes =
          command.name.length > 10
            ? 'tok tok-command text-break'
            : 'tok tok-command';
        const rail = this.getCommandRail(command);
        const href = this.toCurrentHref({ rail });
        return `<a class="${classes}" name="${this.escapeAttribute(
          command.name,
        )}" translate="no" href="${this.escapeAttribute(href)}">${this.escapeHtml(
          command.name,
        )}</a>`;
      }
    }

    const refHref = this.getRefHref(arg);
    const display = this.overlayValue(arg);

    if (refHref) {
      return `<a class="tok tok-ref identifier" href="${this.escapeAttribute(refHref)}">${this.escapeHtml(
        display,
      )}</a>`;
    }

    return `<span class="tok ${this.getClass(arg)}">${this.escapeHtml(display)}</span>`;
  }

  private overlayValue(arg: number | string): string {
    let resolved: number | string = arg;
    if (typeof arg === 'string' && arg.startsWith('$')) {
      const refIndex = Number.parseInt(arg.slice(1), 10);
      if (
        !Number.isNaN(refIndex) &&
        refIndex >= 0 &&
        refIndex < this.code.symbols.length
      ) {
        resolved = this.code.symbols[refIndex];
      }
    }

    const value = String(resolved);
    return this.overlay[value] ?? this.defaultOverlay(value);
  }

  private defaultOverlay(value: string): string {
    if (value.startsWith('g.')) {
      return `$${value.split('.')[1]}`;
    }
    if (value.startsWith('ref.')) {
      return `@label_${value.split('.')[1]}`;
    }
    if (value.startsWith('l.')) {
      return `${value.split('.')[1]}@`;
    }
    return value;
  }

  private formatLabel(lineOffset: number): string {
    const ref = lineOffset + this.code.base;
    const key = `ref.${ref}`;
    const label = this.overlay[key];
    return label ? `:${label}` : `:label_${ref}`;
  }

  private toRouteHref(route: string[]): string {
    return this.toExternalHref(this.router.createUrlTree(route));
  }

  private toCurrentHref(options: {
    fragment?: string;
    rail?: string | undefined;
  }): string {
    const tree = this.router.createUrlTree([], {
      relativeTo: this.route,
      fragment: options.fragment,
      queryParams: options.rail ? { rail: options.rail } : { rail: null },
      queryParamsHandling: 'merge',
    });
    return this.toExternalHref(tree);
  }

  private toExternalHref(tree: ReturnType<Router['createUrlTree']>): string {
    return this.locationStrategy.prepareExternalUrl(
      this.router.serializeUrl(tree),
    );
  }

  private getLineNumberAnchorId(index: number): string {
    return `L${index + 1}`;
  }

  private renderIndent(level: number): string {
    if (level <= 0) {
      return '';
    }

    return `<span class="line-indent" aria-hidden="true">${' '.repeat(level * 2)}</span>`;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private escapeAttribute(value: string): string {
    return this.escapeHtml(value);
  }

  onRenderedClick(event: MouseEvent): void {
    const eventTarget = event.target as EventTarget | null;
    if (eventTarget instanceof HTMLAnchorElement) {
      const href = eventTarget.getAttribute('href');

      if (!href) {
        return;
      }

      const routeUrl = href.startsWith('#/') ? href.slice(2) : href;
      event.preventDefault();
      event.stopPropagation();
      this.router.navigateByUrl(routeUrl);
    }
  }
}
