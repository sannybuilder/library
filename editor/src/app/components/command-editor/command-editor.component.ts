import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Modal } from 'bootstrap';
import { Command } from '../../models';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
})
export class CommandEditorComponent implements AfterViewInit {
  private _command: Command;
  private _extension: string;

  set command(value: Command) {
    this._command = JSON.parse(JSON.stringify(value));
  }

  get command(): Command {
    return this._command;
  }

  get extension(): string {
    return this._extension;
  }

  @Output() save: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();

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

  public open(command: Command, extension: string) {
    this.command = command;
    this._extension = extension;
    this.handle.show();
  }

  public close() {
    this.handle.hide();
  }

  saveAndClose() {
    this.save.emit({ command: this.command, extension: this.extension });
    this.close();
  }
}
