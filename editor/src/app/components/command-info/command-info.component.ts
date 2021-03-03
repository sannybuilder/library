import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Modal } from 'bootstrap';
import { Command } from 'src/app/models';

@Component({
  selector: 'scl-command-info',
  templateUrl: './command-info.component.html',
  styleUrls: ['./command-info.component.scss'],
})
export class CommandInfoComponent implements AfterViewInit, OnDestroy {
  private _handle: Modal;
  command: Command;

  ngAfterViewInit(): void {
    this._handle = new Modal(document.getElementById('modal-info'), {
      backdrop: 'static',
      keyboard: true,
    });
  }

  close() {
    this._handle.hide();
  }

  public open(command: Command) {
    this.command = command;
    this._handle.show();
  }

  ngOnDestroy() {
    this._handle.dispose();
  }
}
