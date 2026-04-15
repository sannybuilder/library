import { Component, Input } from '@angular/core';
import { Command, Game, ViewContext } from '../../../models';
import {
  getRoutePath,
  normalizeScmPath,
  extractRefOffset,
} from '../../../utils';
import { getDefaultExtension } from '../../../utils/extension';
import { ScmMap, ScriptFile } from '../model';

interface RefLink {
  routerLink: string[];
  fragment?: string;
}

@Component({
  selector: 'scl-scm-view',
  templateUrl: './scm-view.component.html',
  styleUrls: ['./scm-view.component.scss'],
  standalone: false,
})
export class ScmViewComponent {
  private _code: ScriptFile = { base: 0, symbols: [], refs: [], lines: [] };
  idents: number[] = [];
  get code() {
    return this._code;
  }
  @Input() set code(value: ScriptFile) {
    this._code = value;

    let ident = 0;
    this.idents = [];

    for (let i = 0; i < this.code.lines.length; i++) {
      let keyword = this.code.lines[i][2];
      this.idents[i] = ident;
      if (!keyword || typeof keyword !== 'string') {
        continue;
      }

      if (['IF', 'SWITCH', 'WHILE', 'REPEAT'].includes(keyword)) {
        this.idents[i] = ident;
        ident++;
      }

      if (['END', 'UNTIL'].includes(keyword)) {
        ident = Math.max(0, ident - 1);
        this.idents[i] = ident;
      }

      if (['THEN', 'ELSE', 'DO', 'CASE', 'DEFAULT'].includes(keyword)) {
        this.idents[i] = ident - 1;
      }
    }
  }

  @Input() commands: Command[] = [];
  @Input() overlay: Record<string, string> = {};
  @Input() scmMap: ScmMap | null = null;
  @Input() game!: Game;
  @Input() viewContext!: ViewContext;
  @Input() activeFragment?: string | null;
  @Input() showLineNumbers!: boolean;
  @Input() showOffsets!: boolean;
  @Input() adjustOffsets: number = 0;

  findCommand(name: string): Command | undefined {
    if (!this.commands) {
      return;
    }
    const command = this.commands.find((cmd) => cmd.name === name);
    return command;
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

  getLineNumberAnchorId(index: number): string {
    return `L${index + 1}`;
  }

  isActiveLine(index: number, line: Array<number | string>): boolean {
    if (!this.activeFragment) {
      return false;
    }

    return this.activeFragment === this.getLineNumberAnchorId(index);
  }

  getRefLink(arg: number | string): RefLink | null {
    const refKey = this.getRefKey(arg);
    if (!refKey || !this.scmMap) {
      return null;
    }

    // is this a local label reference?
    const absOffset = extractRefOffset(refKey);
    const relativeOffset = Number.parseInt(absOffset, 10) - this._code.base;
    if (this._code.refs.includes(relativeOffset)) {
      return {
        routerLink: [],
        fragment: 'label-' + absOffset,
      };
    }

    const target = this.scmMap.files.find((file) => file.name === refKey);
    if (!target) {
      return null;
    }

    return {
      routerLink: getRoutePath(this.game, normalizeScmPath(target.path)),
    };
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
            refIndex < this._code.symbols.length
          ) {
            let symbol = this._code.symbols[refIndex];
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
      refIndex >= this._code.symbols.length
    ) {
      return null;
    }

    return this._code.symbols[refIndex] ?? null;
  }

  isRef(index: number) {
    const line = this.code.lines[index];
    if (typeof line[0] !== 'number') {
      return false;
    }
    return this.code.refs.includes(line[0]);
  }

  isTerminalInstruction(name: string): boolean {
    return [
      'RETURN',
      'RETURN_TRUE',
      'RETURN_FALSE',
      'RETURN_IF_TRUE',
      'RETURN_TRUE_IF_TRUE',
      'TERMINATE_THIS_SCRIPT',
      'GOTO',
    ].includes(name);
  }

  isUnreachableInstruction(index: number): boolean {
    return (
      !this.isRef(index) &&
      index > 0 &&
      index < this.code.lines.length &&
      this.isTerminalInstruction(this.code.lines[index - 1][2] as string) &&
      !['END', 'ELSE', 'CASE', 'DEFAULT'].includes(this.code.lines[index][2] as string)
    );
  }
}
