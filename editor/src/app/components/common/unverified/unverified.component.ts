import { Component, Input } from '@angular/core';
import { Command } from '../../../models';
import { ExtensionsFacade, UiFacade } from '../../../state';
import { omit } from 'lodash';

@Component({
  selector: 'scl-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss'],
  standalone: false,
})
export class UnverifiedComponent {
  @Input() command: Command;
  @Input() extension: string;
  @Input() canEdit: boolean;

  constructor(private _extensions: ExtensionsFacade, private _ui: UiFacade) {}

  markAsVerified() {
    this._extensions.updateCommand({
      extension: this.extension,
      command: {
        ...this.command,
        attrs: omit(this.command.attrs, '_unverified'),
      },
      shouldDelete: false,
      updateRelated: false,
    });

    this._ui.verifyCommand();

    return false;
  }
}
