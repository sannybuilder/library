import { Component } from '@angular/core';
import { Game, GameClasses, GameIcon } from '../../models';
import { StateFacade } from '../../state/facade';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
})
export class DownloadPanelComponent {
  displayDownloadPanel$ = this._facade.displayDownloadPanel$;
  game$ = this._facade.game$;

  constructor(private _facade: StateFacade) {}

  onSearchUpdate(term: string) {
    this._facade.updateSearch(term);
  }

  getGameIcon(game: Game) {
    return GameIcon[game];
  }

  getClasses(game: Game) {
    return GameClasses[game];
  }
}
