import { Injectable, OnDestroy } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Command, EnumRaw } from '../../models';
import { UiFacade } from '../../state';

@Injectable()
export class ContextEditSessionService implements OnDestroy {
  command?: Command;
  oldCommand?: Command;
  snippet?: string;
  oldSnippet?: string;
  extension?: string;
  oldExtension?: string;
  enumToDisplayOrEdit?: EnumRaw;
  oldEnumToEdit?: EnumRaw;

  private readonly _onDestroy$ = new Subject<void>();

  constructor(private _ui: UiFacade) {
    combineLatest([
      this._ui.commandToDisplayOrEdit$,
      this._ui.extensionToDisplayOrEdit$,
    ])
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(([command, extension]) => {
        this.command = command
          ? { input: [], output: [], ...cloneDeep(command) }
          : command;
        this.oldCommand = cloneDeep(this.command);
        this.extension = extension;
        this.oldExtension = extension;
      });

    this._ui.snippetToDisplayOrEdit$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((snippet) => {
        this.snippet = snippet;
        this.oldSnippet = snippet;
      });

    this._ui.enumToDisplayOrEdit$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((enumToEdit) => {
        this.enumToDisplayOrEdit = cloneDeep(enumToEdit);
        this.oldEnumToEdit = cloneDeep(enumToEdit);
      });
  }

  ngOnDestroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
