import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Modal } from 'bootstrap';
import { Command } from '../../models';
import { SelectorComponent } from '../selector/selector.component';

export interface SaveEvent {
  command: Command;
  newExtension: string;
  oldExtension: string;
}

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
})
export class CommandEditorComponent implements AfterViewInit {
  @ViewChild(SelectorComponent) selector: SelectorComponent;

  private _command: Command;
  private _oldExtension: string;
  private _newExtension: string;
  extensions: string[];

  set command(value: Command) {
    this._command = JSON.parse(JSON.stringify(value));
  }

  get command(): Command {
    return this._command;
  }

  get extension(): string {
    return this._newExtension;
  }

  set extension(val: string) {
    if (!val) {
      console.warn('extension can not be empty, using "default"');
      val = 'default';
    }
    this._newExtension = val;
  }

  @Output() save: EventEmitter<SaveEvent> = new EventEmitter();

  readonly attrs = [
    'is_branch',
    'is_segment',
    'is_keyword',
    'is_condition',
    'is_nop',
    'is_unsupported',
    'is_constructor',
    'is_destructor',
    'is_static',
    'is_overload',
  ];

  private handle: Modal;

  ngAfterViewInit(): void {
    this.handle = new Modal(document.getElementById('modal'), {});
  }

  public open(
    command: Command,
    extension: string,
    availableExtensions: string[]
  ) {
    this.command = command;
    this._oldExtension = extension;
    this.extension = extension;
    this.extensions = availableExtensions;
    if (this.selector) {
      this.selector.freeInput = '';
    }
    this.handle.show();
  }

  public close() {
    this.handle.hide();
  }

  saveAndClose() {
    this.save.emit({
      command: this.command,
      newExtension: this._newExtension,
      oldExtension: this._oldExtension,
    });
    this.close();
  }
}
