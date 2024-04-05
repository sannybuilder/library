import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ConstructorHandler,
  getQueryParamsForCommand,
  isSupported,
} from '../../../utils';
import {
  ClassMeta,
  Command,
  DEFAULT_EXTENSION,
  Extension,
  Game,
} from '../../../models';

type ClassCommand = { command: Command; extension: string };

@Component({
  selector: 'scl-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassOverviewComponent {
  private _classCommands: ClassCommand[];
  private _gameExtensions: Extension[] = [];
  private _className: Game;
  DEFAULT_EXTENSION = DEFAULT_EXTENSION;
  filterQuery = '';
  commandsHaveSameOrigin = true;
  externalConstructors: Record<
    string,
    Array<{ command: Command; extension: string }>
  > = {};

  @Input() set gameExtensions(val: Extension[]) {
    this._gameExtensions = val;
    this.externalConstructors = this.findExternalConstructors();
  }
  get gameExtensions() {
    return this._gameExtensions;
  }

  @Input() displayInlineDescription: boolean;
  @Input() game: Game;
  @Input() set className(val: Game) {
    this._className = val;
    this.externalConstructors = this.findExternalConstructors();
  }
  get className() {
    return this._className;
  }
  @Input() classOrigin: string;
  @Input() meta?: ClassMeta;
  @Input() set classCommands(val: ClassCommand[]) {
    this._classCommands = val;

    const origins = new Set();
    val.forEach(({ extension }) => {
      origins.add(extension);
    });
    this.commandsHaveSameOrigin = origins.size === 1;
  }
  get classCommands() {
    return this._classCommands;
  }

  @Output() view: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();
  @Output() descriptionClick = new EventEmitter();

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }

  interceptDescriptionClick(event: MouseEvent) {
    this.descriptionClick.next(event);
    return false;
  }

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }

  isSupported(command: Command) {
    return isSupported(command.attrs);
  }

  findExternalConstructors() {
    if (!this.className || !this.gameExtensions.length) {
      return {};
    }
    return this.gameExtensions.reduce((m, v) => {
      const cs = v.commands.filter(
        (c) =>
          c.class &&
          c.class !== this.className &&
          ConstructorHandler(c, this.className)
      );

      for (const c of cs) {
        m[c.class!] ??= [];
        m[c.class!].push({
          command: c,
          extension: v.name,
        });
      }

      return m;
    }, {} as Record<string, Array<{ command: Command; extension: string }>>);
  }
}
