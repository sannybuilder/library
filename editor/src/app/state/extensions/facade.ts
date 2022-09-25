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
  markCommandsToDelete,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class ExtensionsFacade {
  extensions$ = this.store$
    .select(selector.extensions)
    .pipe(filter((v): v is Extension[] => !!v));

  extensionNames$ = this.store$.select(selector.extensionNames);
  entities$ = this.store$.select(selector.entities);
  loading$ = this.store$.select(selector.loading);
  lastUpdate$ = this.store$.select(selector.lastUpdate);
  version$ = this.store$.select(selector.version);
  supportInfo$ = this.store$.select(selector.supportInfo);
  classesMeta$ = this.store$.select(selector.classesMeta);
  commandsToDelete$ = this.store$.select(selector.commandsToDelete);

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

  updateCommand({
    command,
    newExtension,
    oldExtension,
  }: {
    command: Command;
    newExtension: string;
    oldExtension: string;
  }) {
    this.store$.dispatch(
      updateCommands({
        batch: [{ command, newExtension, oldExtension, ignoreVersionAndPlatform: false }],
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
      game
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

  markCommandsToDelete(names: string[], game: Game) {
    this.store$.dispatch(markCommandsToDelete({ names, game }));
  }
}
