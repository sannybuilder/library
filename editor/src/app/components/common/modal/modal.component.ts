import {
  AfterViewInit,
  Component,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Modal } from 'bootstrap';
import jQuery from 'jquery';

@Component({
  selector: 'scl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Output() close = new EventEmitter();

  private _handle: Modal;
  private _element: HTMLElement;

  private _close = this.onClose.bind(this);

  ngAfterViewInit() {
    this._element = document.getElementById('modal')!;
    this._handle = new Modal(this._element, {
      backdrop: 'static',
      keyboard: true,
    });
    this._handle.show();

    jQuery(this._element).on('hidden.bs.modal', this._close);
  }

  ngOnDestroy() {
    this._handle.hide();
    this._handle.dispose();
    jQuery(this._element).off('hidden.bs.modal', this._close);
  }

  onClose() {
    this.close.emit();
  }
}
