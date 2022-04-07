import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenerateJsonModel } from '../../../models';

@Component({
  selector: 'scl-json-generator',
  templateUrl: './json-generator.component.html',
  styleUrls: ['./json-generator.component.scss'],
})
export class JsonGeneratorComponent {
  state: Record<string, boolean> = {};
  fileName = 'cleo.json';

  private _extensionNames: string[];

  @Output() changed = new EventEmitter<GenerateJsonModel>();

  @Input() set extensionNames(val: string[]) {
    this._extensionNames = val;

    this.extensionNames.reduce((m, v) => {
      m[v] = true;
      return m;
    }, this.state);

    this.emit();
  }

  get extensionNames() {
    return this._extensionNames;
  }

  emit() {
    const selectedExtensions = Object.entries(this.state)
      .filter(([k, v]) => v)
      .map(([k, v]) => k);

    this.changed.emit({
      selectedExtensions,
      fileName: this.fileName,
    });
  }
}
