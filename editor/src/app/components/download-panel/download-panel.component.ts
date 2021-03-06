import { Component } from '@angular/core';
import { Game, GameClasses } from '../../models';
import { StateFacade } from '../../state/facade';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
})
export class DownloadPanelComponent {
  game$ = this._facade.game$;

  constructor(private _facade: StateFacade) {}

  onSearchUpdate(term: string) {
    this._facade.updateSearch(term);
  }

  getClasses(game: Game) {
    return GameClasses[game];
  }
}
