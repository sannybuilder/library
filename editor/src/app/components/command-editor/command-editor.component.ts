import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Modal } from 'bootstrap';
import { opcodify } from '../../pipes';
import { Command, CommandAttributes, ParamType } from '../../models';
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
  paramTypes: ParamType[] = [];

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

  readonly attrs = CommandAttributes;
  readonly primitiveTypes = [
    ParamType.int,
    ParamType.float,
    ParamType.any,
    ParamType.arguments,
    ParamType.label,
    ParamType.string,
  ];

  private handle: Modal;

  ngAfterViewInit(): void {
    this.handle = new Modal(document.getElementById('modal'), {});
  }

  public open(
    command: Command,
    extension: string,
    availableExtensions: string[],
    entities: ParamType[]
  ) {
    this.command = command;
    this._oldExtension = extension;
    this.extension = extension;
    this.extensions = availableExtensions;
    const paramTypes = new Set([...this.primitiveTypes, ...entities]);
    this.paramTypes = [...paramTypes];
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

  onCommandNameChange(command: Command, value: string) {
    command.name = value ? value.replace('-', '_').toUpperCase() : value;
  }

  onOpcodeChange(command: Command, value: string) {
    command.id = value ? value.toUpperCase() : value;
  }

  onClassChange(command: Command, value: string) {
    if (value.length > 1) {
      command.class = value[0].toUpperCase() + value.substring(1);
    } else {
      command.class = value;
    }
  }

  onMemberChange(command: Command, value: string) {
    command.member =
      value?.length > 1 ? value[0].toUpperCase() + value.substring(1) : value;
  }

  opcodify(command: Command) {
    command.id = opcodify(command.id);
  }
}
