import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { KeyValueEntry } from '../model';

@Component({
  selector: 'scl-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VariableListComponent {
  @Input() variables: KeyValueEntry[] = [];
  filterQuery = '';

  get filteredEntries(): KeyValueEntry[] {
    const query = this.filterQuery.trim().toLowerCase();
    if (!query) {
      return this.variables;
    }

    return this.variables.filter(({ key, value }) => {
      const formattedKey = this.toRawVariableKey(key).toLowerCase();
      return (
        formattedKey.includes(query) ||
        (value ?? '').toLowerCase().includes(query)
      );
    });
  }

  toRawVariableKey(key: string): string {
    return key.startsWith('g.') ? key.slice('g.'.length) : key;
  }
}
