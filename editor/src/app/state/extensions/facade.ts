import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Command, Extension, Game } from '../../models';
import {
  updateCommands,
  loadExtensions,
  cloneCommand,
  initSupportInfo,
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
  hasAnyLoadingInProgress$ = this.store$.select(
    selector.hasAnyLoadingInProgress
  );

  getGameExtensions(game: Game) {
    return this.store$.select(selector.gameExtensions, { game });
  }

  getExtensionEntities(extension: string) {
    return this.store$.select(selector.extensionEntities, { extension });
  }

  getExtensionCommands(extension: string) {
    return this.store$.select(selector.extensionCommands, { extension });
  }

  getExtensionCommand({
    command,
    extension,
  }: {
    command: Command;
    extension: string;
  }) {
    return this.store$.select(selector.extensionCommand, {
      extension,
      command,
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
        batch: [{ command, newExtension, oldExtension }],
      })
    );
  }

  loadExtensions(game: Game) {
    this.store$.dispatch(loadExtensions({ game }));
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

  initSupportInfo() {
    this.store$.dispatch(initSupportInfo());
  }
}
