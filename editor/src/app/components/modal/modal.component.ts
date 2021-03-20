import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'scl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  private _handle: Modal;

  ngAfterViewInit() {
    this._handle = new Modal(document.getElementById('modal'), {
      backdrop: 'static',
      keyboard: true,
    });
    this.open();
  }

  ngOnDestroy() {
    this.close();
    this._handle.dispose();
  }

  public open() {
    this._handle.show();
  }

  public close() {
    this._handle.hide();
  }
}
