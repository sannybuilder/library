import { LocationStrategy } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Command, Game, ViewContext } from '../../../models';
import {
  getRoutePath,
  normalizeScmPath,
  extractRefOffset,
} from '../../../utils';
import { getDefaultExtension } from '../../../utils/extension';
import { KeyValueEntry, ScmMap, ScriptFile } from '../model';
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
  private host = inject(ElementRef<HTMLElement>);

  @Input() code: ScriptFile = { base: 0, symbols: [], refs: [], lines: [] };
  @Input() commands: Command[] = [];
  @Input() variablesOverlay: KeyValueEntry[] = [];
  @Input() refsOverlay: KeyValueEntry[] = [];
  @Input() commentsOverlay: KeyValueEntry[] = [];
  @Input() showComments: boolean = true;
  @Input() canEdit: boolean = false;
  @Input() scmMap: ScmMap | null = null;
  @Input() game!: Game;
  @Input() viewContext!: ViewContext;
  @Input() activeFileName?: string | null;
  @Input() activeFragment?: string | null;
  @Input() showLineNumbers!: boolean;
  @Input() showOffsets!: boolean;
  @Input() adjustOffsets: number = 0;
  @Output() commentsOverlayChange = new EventEmitter<KeyValueEntry[]>();
  @ViewChild('commentEditorTextarea')
  commentEditorTextarea?: ElementRef<HTMLTextAreaElement>;
  renderedHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml('');

  private commandByName = new Map<string, Command>();
  private scmTargetPathByName = new Map<string, string>();
  private refsSet = new Set<number>();
  private editableComments: KeyValueEntry[] = [];
  private commentsByOffset = new Map<number, string[]>();
  private isActiveMissionFile = false;
  private readonly terminalInstructions = new Set([
    'RETURN',
    'RETURN_TRUE',
    'RETURN_FALSE',
    'RETURN_IF_TRUE',
    'RETURN_TRUE_IF_TRUE',
    'TERMINATE_THIS_SCRIPT',
    'GOTO',
  ]);
  commentEditorOpen = false;
  commentEditorOffset: number | null = null;
  commentEditorText = '';
  commentEditorHasExisting = false;
  commentEditorTop = 0;
  commentEditorLeft = 0;

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

    if (changes['scmMap'] || changes['activeFileName']) {
      this.isActiveMissionFile = this.computeIsActiveMissionFile();
    }

    if (changes['code']) {
      this.refsSet = new Set(
        (this.code?.refs ?? []).filter(
          (offset): offset is number => typeof offset === 'number',
        ),
      );
    }

    if (changes['commentsOverlay']) {
      this.editableComments = (this.commentsOverlay ?? []).map((entry) => ({
        key: entry.key,
        value: entry.value,
      }));
      this.commentsByOffset = this.buildCommentsByOffset(this.editableComments);
    }

    const shouldRebuildHtml = [
      'code',
      'commands',
      'variablesOverlay',
      'refsOverlay',
      'commentsOverlay',
      'showComments',
      'canEdit',
      'scmMap',
      'game',
      'viewContext',
      'activeFileName',
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
          const symbol = this.getSymbol(arg);
          if (symbol) {
            if (symbol.startsWith('g.') || symbol.startsWith('l.')) {
              return 'tok-var';
            }
            if (symbol.startsWith('ref.')) {
              return 'tok-ref';
            }
          }
          return 'tok';
        }
        case '#':
          return 'tok-model';
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
    const symbol = this.getSymbol(arg);
    if (!symbol?.startsWith('ref.')) {
      return null;
    }

    return symbol;
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
      const isStandaloneComment = this.isStandaloneCommentLine(line);
      const isCommentGroupStart =
        isStandaloneComment && !this.isStandaloneCommentLine(lines[i - 1]);
      const externalComments = this.showComments
        ? this.getExternalComments(lineOffset)
        : [];
      const commentOffset = this.getCommentOffset(lineOffset);
      const hasExternalComment =
        commentOffset !== null && this.commentsByOffset.has(commentOffset);
      const activeClass =
        this.activeFragment === this.getLineNumberAnchorId(i) ? ' active' : '';
      const isActiveLine =
        this.activeFragment === this.getLineNumberAnchorId(i);

      if (externalComments.length > 0) {
        parts.push('<div class="line-row comment-group-start">');
        if (this.showLineNumbers) {
          parts.push('<div class="line-number"></div>');
        }
        if (this.canEdit) {
          parts.push('<div class="line-comment-control">');
          parts.push(this.renderIndent(idents[i]));
          if (commentOffset !== null) {
            if (hasExternalComment || isActiveLine) {
              const buttonLabel = hasExternalComment ? '…' : '+';
              const buttonTitle = hasExternalComment
                ? 'Edit line comment'
                : 'Add line comment';
              const buttonClass = [
                'line-comment-trigger',
                hasExternalComment ? 'has-comment' : '',
                isActiveLine ? 'is-active-line' : '',
              ]
                .filter((className) => className.length > 0)
                .join(' ');
              parts.push(
                `<button type="button" class="${buttonClass}" data-comment-action="open" data-comment-offset="${this.escapeAttribute(
                  String(commentOffset),
                )}" data-line-index="${i}" title="${this.escapeAttribute(
                  buttonTitle,
                )}" aria-label="${this.escapeAttribute(
                  buttonTitle,
                )}">${buttonLabel}</button>`,
              );
            }
          }
          parts.push('</div>');
        }
        parts.push('<div class="line-content">');
        for (const comment of externalComments) {
          parts.push(
            `<span class="tok tok-comment">${this.escapeHtml(this.toCommentText(comment))}</span><br>`,
          );
        }
        parts.push('</div></div>');
      }

      if (this.isRef(i) && typeof lineOffset === 'number') {
        const labelId = `label-${this.code.base + lineOffset}`;
        let text = this.escapeHtml(this.formatLabel(lineOffset));
        let title = `Click to view Xrefs for ${text}`;
        let href = this.escapeAttribute(
          this.toCurrentHref({ fragment: labelId }),
        );
        let id = this.escapeAttribute(labelId);
        let classes = 'tok-label tok-ref identifier';
        parts.push(
          `<a title="${title}" href="${href}" id="${id}" class="${classes}">${text}</a>`,
        );
      }

      const commentGroupClass = isCommentGroupStart
        ? ' comment-group-start'
        : '';
      parts.push(`<div class="line-row${activeClass}${commentGroupClass}">`);

      if (this.showLineNumbers) {
        const lineAnchorId = this.getLineNumberAnchorId(i);
        parts.push(
          `<div class="line-number"><a class="identifier" id="${lineAnchorId}" href="${this.escapeAttribute(
            this.toCurrentHref({ fragment: lineAnchorId }),
          )}">${i + 1}</a></div>`,
        );
      }

      if (this.canEdit) {
        parts.push('<div class="line-comment-control">');
        if (commentOffset !== null && isActiveLine) {
          const buttonLabel = hasExternalComment ? '…' : '+';
          const buttonTitle = hasExternalComment
            ? 'Edit line comment'
            : 'Add line comment';
          const buttonClass = [
            'line-comment-trigger',
            hasExternalComment ? 'has-comment' : '',
            isActiveLine ? 'is-active-line' : '',
          ]
            .filter((className) => className.length > 0)
            .join(' ');
          parts.push(
            `<button type="button" class="${buttonClass}" data-comment-action="open" data-comment-offset="${this.escapeAttribute(
              String(commentOffset),
            )}" data-line-index="${i}" title="${this.escapeAttribute(
              buttonTitle,
            )}" aria-label="${this.escapeAttribute(
              buttonTitle,
            )}">${buttonLabel}</button>`,
          );
        }
        parts.push('</div>');
      }

      if (this.showOffsets && !isStandaloneComment) {
        const absoluteOffset = this.getAbsoluteOffset(lineOffset);
        parts.push(
          `<div class="text-muted line-offset line-offset-absolute pointer" data-copy-text="${this.escapeAttribute(
            absoluteOffset,
          )}" title="Click the absolute offset number to copy to clipboard">${this.escapeHtml(absoluteOffset)}</div>`,
        );

        if (this.isActiveMissionFile) {
          const relativeOffset = this.getRelativeOffset(lineOffset);
          parts.push(
            `<div class="text-muted line-offset line-offset-relative" title="Relative to mission base offset">${this.escapeHtml(relativeOffset)}</div>`,
          );
        }
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

  private getExternalComments(lineOffset: number | string): string[] {
    const absoluteOffset = this.getCommentOffset(lineOffset);
    if (absoluteOffset === null) {
      return [];
    }

    return this.commentsByOffset.get(absoluteOffset) ?? [];
  }

  private getCommentOffset(lineOffset: number | string): number | null {
    const numericOffset = this.parseLineOffset(lineOffset);
    if (numericOffset === null) {
      return null;
    }

    return this.code.base + numericOffset;
  }

  private buildCommentsByOffset(
    entries: KeyValueEntry[],
  ): Map<number, string[]> {
    const result = new Map<number, string[]>();

    for (const entry of entries) {
      const offset = Number(entry.key);
      if (Number.isNaN(offset)) {
        continue;
      }

      const normalizedValue = entry.value.replace(/\r\n/g, '\n');
      if (!normalizedValue.trim().length) {
        continue;
      }

      const lines = normalizedValue.split('\n');

      if (lines.length > 0) {
        result.set(offset, lines);
      }
    }

    return result;
  }

  private toCommentText(comment: string): string {
    const trimmed = comment.trimStart();
    if (trimmed.startsWith('//')) {
      return comment;
    }

    if (!trimmed.length) {
      return '//';
    }

    return `// ${comment}`;
  }

  private isStandaloneCommentLine(
    line: Array<number | string> | undefined,
  ): boolean {
    if (!line) {
      return false;
    }

    for (const token of line.slice(2)) {
      if (typeof token !== 'string') {
        return false;
      }

      const trimmedToken = token.trimStart();
      if (!trimmedToken.length) {
        continue;
      }

      return trimmedToken.startsWith('//');
    }

    return false;
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

    let symbol = this.getSymbol(arg);
    if (symbol) {
      let escapedSymbol = this.escapeAttribute(symbol);
      return `<span title="Click to copy ${symbol} to clipboard" data-copy-text="${escapedSymbol}" class="tok ${this.getClass(arg)}">${this.escapeHtml(display)}</span>`;
    }

    return `<span class="tok ${this.getClass(arg)}">${this.escapeHtml(display)}</span>`;
  }

  private getSymbol(arg: number | string): string | null {
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

  private overlayValue(arg: number | string): string {
    const resolved = this.getSymbol(arg) ?? arg;
    const value = String(resolved);
    if (value.startsWith('g.') || value.startsWith('l.')) {
      return (
        this.variablesOverlay.find((e) => e.key === value)?.value ??
        this.defaultOverlay(value)
      );
    }

    if (value.startsWith('ref.')) {
      return (
        this.refsOverlay.find((e) => e.key === value)?.value ??
        this.defaultOverlay(value)
      );
    }

    return this.defaultOverlay(value);
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
    const label = this.refsOverlay.find((e) => e.key === key)?.value;
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

  private getAbsoluteOffset(lineOffset: number | string): string {
    const numericOffset = this.parseLineOffset(lineOffset);
    if (numericOffset === null) {
      return '';
    }
    return String(this.code.base + numericOffset + this.adjustOffsets);
  }

  private getRelativeOffset(lineOffset: number | string): string {
    const numericOffset = this.parseLineOffset(lineOffset);
    if (numericOffset === null) {
      return '';
    }

    return String(numericOffset);
  }

  private parseLineOffset(lineOffset: number | string): number | null {
    if (lineOffset === '') {
      return null;
    }

    const numericOffset = Number(lineOffset);
    if (Number.isNaN(numericOffset)) {
      return null;
    }

    return numericOffset;
  }

  private computeIsActiveMissionFile(): boolean {
    if (!this.scmMap || !this.activeFileName) {
      return false;
    }

    const activeEntry = this.scmMap.files.find(
      (file) => normalizeScmPath(file.path) === this.activeFileName,
    );
    if (!activeEntry) {
      return false;
    }

    const groupName = (this.scmMap.groups[activeEntry.pid] ?? '').toLowerCase();
    return groupName === 'missions';
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
    const eventTarget = event.target as HTMLElement | null;
    if (!eventTarget) {
      return;
    }

    const commentButton = eventTarget.closest(
      'button[data-comment-action="open"]',
    );
    if (commentButton instanceof HTMLButtonElement) {
      if (!this.canEdit) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      this.openCommentEditor(commentButton);
      return;
    }

    if (this.commentEditorOpen) {
      this.closeCommentEditor();
    }

    const anchorTarget = eventTarget.closest('a[href]');
    if (anchorTarget instanceof HTMLAnchorElement) {
      const href = anchorTarget.getAttribute('href');

      if (!href) {
        return;
      }

      const routeUrl = href.startsWith('#/') ? href.slice(2) : href;
      event.preventDefault();
      event.stopPropagation();
      this.router.navigateByUrl(routeUrl);
    }
  }

  onCommentEditorInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.commentEditorText = target.value;
  }

  onCommentEditorKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeCommentEditor();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      this.saveCommentEditor();
    }
  }

  saveCommentEditor(): void {
    if (this.commentEditorOffset === null) {
      return;
    }

    const nextComments = this.applyCommentUpdate(
      this.editableComments,
      this.commentEditorOffset,
      this.commentEditorText,
    );
    this.commitComments(nextComments);
  }

  deleteCommentEditor(): void {
    if (this.commentEditorOffset === null) {
      return;
    }

    const nextComments = this.applyCommentUpdate(
      this.editableComments,
      this.commentEditorOffset,
      '',
    );
    this.commitComments(nextComments);
  }

  closeCommentEditor(): void {
    this.commentEditorOpen = false;
    this.commentEditorOffset = null;
    this.commentEditorText = '';
    this.commentEditorHasExisting = false;
  }

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    if (this.commentEditorOpen) {
      this.closeCommentEditor();
    }
  }

  private openCommentEditor(button: HTMLButtonElement): void {
    const offsetRaw = button.dataset['commentOffset'];
    const offset = offsetRaw ? Number.parseInt(offsetRaw, 10) : Number.NaN;
    if (Number.isNaN(offset)) {
      return;
    }

    const existingComment = this.commentsByOffset.get(offset);
    const container = this.host.nativeElement.querySelector(
      '#code-container',
    ) as HTMLElement | null;
    if (!container) {
      return;
    }

    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const estimatedEditorWidth = 360;
    const maxLeft = Math.max(8, container.clientWidth - estimatedEditorWidth);

    this.commentEditorOffset = offset;
    this.commentEditorText = existingComment?.join('\n') ?? '';
    this.commentEditorHasExisting = !!existingComment?.length;
    this.commentEditorTop = buttonRect.top - containerRect.top + 16;
    this.commentEditorLeft = Math.min(
      Math.max(8, buttonRect.left - containerRect.left + 16),
      maxLeft,
    );
    this.commentEditorOpen = true;

    setTimeout(() => {
      this.commentEditorTextarea?.nativeElement.focus();
    });
  }

  private applyCommentUpdate(
    currentEntries: KeyValueEntry[],
    offset: number,
    value: string,
  ): KeyValueEntry[] {
    const normalizedValue = value.replace(/\r\n/g, '\n');
    const nextEntries = currentEntries
      .filter((entry) => Number(entry.key) !== offset)
      .map((entry) => ({ key: entry.key, value: entry.value }));

    if (normalizedValue.trim().length > 0) {
      nextEntries.push({ key: String(offset), value: normalizedValue });
    }

    nextEntries.sort((a, b) => Number(a.key) - Number(b.key));
    return nextEntries;
  }

  private commitComments(nextComments: KeyValueEntry[]): void {
    this.editableComments = nextComments;
    this.commentsByOffset = this.buildCommentsByOffset(nextComments);
    this.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(
      this.buildRenderedHtml(),
    );
    this.commentsOverlayChange.emit(nextComments);
    this.closeCommentEditor();
  }
}
