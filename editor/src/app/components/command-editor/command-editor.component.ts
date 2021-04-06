import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';

import { opcodify } from '../../pipes';
import {
  Attribute,
  Command,
  CommandAttributes,
  Param,
  ParamType,
  SourceType,
  SupportInfo,
} from '../../models';
import { SelectorComponent } from '../selector/selector.component';
import { isAnyAttributeInvalid } from '../../utils/validation';
import { smash } from '../../utils';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
})
export class CommandEditorComponent implements OnInit {
  ParamType = ParamType;
  @ViewChild(SelectorComponent) selector: SelectorComponent;

  paramTypes: ParamType[] = [];

  @Input() command: Command;
  @Input() snippet: string;
  @Input() extension: string;
  @Input() extensionNames: string[];
  @Input() supportInfo: SupportInfo;
  @Output() extensionChange: EventEmitter<string> = new EventEmitter();
  @Output() snippetChange: EventEmitter<string> = new EventEmitter();

  @Input() set entities(val: ParamType[]) {
    const paramTypes = new Set([...this.primitiveTypes, ...val]);
    this.paramTypes = [...paramTypes];
  }

  readonly attrs: Attribute[] = CommandAttributes;
  readonly sources = [
    SourceType.any,
    SourceType.var_any,
    SourceType.var_global,
    SourceType.var_local,
    SourceType.literal,
  ];

  readonly primitiveTypes = [
    ParamType.any,
    ParamType.arguments,
    ParamType.boolean,
    ParamType.float,
    ParamType.int,
    ParamType.label,
    ParamType.string,
  ];

  ngOnInit() {
    if (this.selector) {
      this.selector.freeInput = '';
    }
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

  onExtensionChange(val: string) {
    if (!val) {
      console.warn('extension can not be empty, using "default"');
      val = 'default';
    }
    this.extensionChange.emit(val);
  }

  onSnippetChange(val: string) {
    this.snippetChange.emit(val);
  }

  opcodify(command: Command) {
    command.id = opcodify(command.id);
  }

  onTypeKeyDown(key: string, param: Param) {
    switch (key) {
      case 'i':
        param.type = ParamType.int;
        break;
      case 'f':
        param.type = ParamType.float;
        break;
      case 's':
        param.type = ParamType.string;
        break;
      case 'a':
        param.type = ParamType.arguments;
        break;
      case 'b':
        param.type = ParamType.boolean;
        break;
      case 'l':
        param.type = ParamType.label;
        break;
    }
  }

  getDefaultInputSource(param: Param) {
    return param.source ?? SourceType.any;
  }

  getDefaultOutputSource(param: Param) {
    return param.source ?? SourceType.var_any;
  }

  onParamSourceUpdate(source: SourceType, param: Param) {
    param.source = source;
  }

  onAttrChange(command: Command, attr: Attribute, value: boolean) {
    (command.attrs ??= {})[attr] = value;
    const compressed = smash(command.attrs);
    if (compressed) {
      command.attrs = compressed;
    } else {
      delete command.attrs;
    }
  }

  public shouldDisplayAttributeError(): boolean {
    return isAnyAttributeInvalid(this.command);
  }
}
