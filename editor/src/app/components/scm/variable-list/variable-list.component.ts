import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'scl-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VariableListComponent {
  private _variables: Record<string, string> = {};

  @Input() set variables(value: Record<string, string>) {
    this._variables = value ?? {};
    this.entries = Object.entries(this._variables);
  }

  get variables() {
    return this._variables;
  }

  filterQuery = '';
  entries: Array<[string, string]> = [];

  get filteredEntries(): Array<[string, string]> {
    const query = this.filterQuery.trim().toLowerCase();
    if (!query) {
      return this.entries;
    }

    return this.entries.filter(([key, value]) => {
      const formattedKey = this.toRawVariableKey(key).toLowerCase();
      return formattedKey.includes(query) || (value ?? '').toLowerCase().includes(query);
    });
  }

  toRawVariableKey(key: string): string {
    return key.startsWith('g.') ? key.slice('g.'.length) : key;
  }
}
