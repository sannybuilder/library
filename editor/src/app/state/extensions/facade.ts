import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs/operators';
import { Command, Extension, Game } from '../../models';
import {
  updateCommands,
  loadExtensions,
  cloneCommand,
  initSupportInfo,
  init,
} from './actions';
import * as selector from './selectors';
import { SEARCH_OPTIONS } from '../../utils';
import { omit } from 'lodash';

@Injectable({ providedIn: 'root' })
export class ExtensionsFacade {
  extensions$ = this.store$
    .select(selector.extensions)
    .pipe(filter((v): v is Extension[] => !!v));

  extensionNames$ = this.store$.select(selector.extensionNames);
  entities$ = this.store$.select(selector.entities);
  loading$ = this.store$.select(selector.loading);
  loadingError$ = this.store$.select(selector.loadingError);
  lastUpdate$ = this.store$.select(selector.lastUpdate);
  version$ = this.store$.select(selector.version);
  supportInfo$ = this.store$.select(selector.supportInfo);
  classesMeta$ = this.store$.select(selector.classesMeta);
  extensionTypes$ = this.store$.select(selector.extensionTypes);

  getGameExtensions(game: Game) {
    return this.store$.select(selector.gameExtensions, { game });
  }

  getGameClassesMeta(game: Game) {
    return this.store$.select(selector.gameClassesMeta, { game });
  }

  getGameVersion(game: Game) {
    return this.store$.select(selector.gameVersion, { game });
  }

  getExtensionEntities(extension: string) {
    return this.store$.select(selector.extensionEntities, { extension });
  }

  getExtensionCommands(extension: string) {
    return this.store$.select(selector.extensionCommands, { extension });
  }

  getClassOrigin(className: string) {
    return this.store$.select(selector.classOrigin, { className });
  }

  getExtensionCommand({ id, extension }: { id: string; extension: string }) {
    return this.store$.select(selector.extensionCommand, {
      extension,
      id,
    });
  }

  constructor(private store$: Store) {}

  deleteCommand({
    command,
    extension,
    game,
  }: {
    command: Command;
    extension: string;
    game: Game;
  }) {
    this.store$.dispatch(
      updateCommands({
        batch: [
          {
            command,
            extension,
            shouldDelete: true,
            ignoreVersionAndPlatform: false,
          },
        ],
        updateRelated: false,
      })
    );
  }

  updateCommand({
    command,
    extension,
    shouldDelete,
    updateRelated,
  }: {
    command: Command;
    extension: string;
    shouldDelete: boolean;
    updateRelated: boolean;
  }) {
    this.store$.dispatch(
      updateCommands({
        batch: [
          {
            command: omit(command, SEARCH_OPTIONS.highlightKey),
            extension,
            shouldDelete,
            ignoreVersionAndPlatform: false,
          },
        ],
        updateRelated,
      })
    );
  }

  init() {
    this.store$.dispatch(init());
  }

  cloneCommand({
    command,
    extension,
    game,
  }: {
    command: Command;
    extension: string;
    game: Game;
  }) {
    this.store$.dispatch(cloneCommand({ command, extension, game }));
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this.store$.select(selector.commandSupportInfo, {
      command,
      extension,
    });
  }

  findRelatedCommands(command: Command, extension: string, game: Game) {
    return this.store$.select(selector.commandRelated, {
      command,
      extension,
      game,
    });
  }

  getClassMeta(game: Game, className: string) {
    return this.store$.select(selector.classMeta, { game, className });
  }

  initSupportInfo(game: Game) {
    this.store$.dispatch(initSupportInfo({ game }));
  }

  loadExtensions(game: Game) {
    this.getGameExtensions(game)
      .pipe(
        take(1),
        filter((x) => !x.length),
        tap(() => {
          this.store$.dispatch(loadExtensions({ game }));
        })
      )
      .subscribe();
  }

}
