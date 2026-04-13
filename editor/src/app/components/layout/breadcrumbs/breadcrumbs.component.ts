import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game, ViewContext } from '../../../models';
import {
  doesGameHaveNativeDocs,
  doesGameHaveScm,
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

  doesGameHaveNativeDocs(game: Game) {
    return doesGameHaveNativeDocs(game);
  }

  doesGameHaveScm(game: Game) {
    return doesGameHaveScm(game);
  }
}
