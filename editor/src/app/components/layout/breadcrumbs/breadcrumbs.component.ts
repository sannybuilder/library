import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game, ViewContext, ScmVersion } from '../../../models';
import {
  doesGameHaveNativeDocs,
  doesGameHaveScm,
  getScmVersionConfig,
  getScmVersionLabel,
  isCodeViewContext,
  isScmViewContext,
} from '../../../utils';

@Component({
  selector: 'scl-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BreadcrumbsComponent {
  ViewContext = ViewContext;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScmViewContext = isScmViewContext;
  @Input() game!: Game;
  @Input() screenSize: number = window.innerWidth;
  @Input() viewContext!: ViewContext;
  @Input() version?: string;

  doesGameHaveNativeDocs(game: Game) {
    return doesGameHaveNativeDocs(game);
  }

  doesGameHaveScm(game: Game) {
    return doesGameHaveScm(game);
  }

  getScmVersions(game: Game): ScmVersion[] | undefined {
    return getScmVersionConfig(game)?.versions;
  }

  getScmVersionLabel(game: Game, id: string): string {
    return getScmVersionLabel(game, id);
  }

  getCurrentScmLabel(): string | undefined {
    return this.version ? getScmVersionLabel(this.game, this.version) : undefined;
  }
}
