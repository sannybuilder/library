import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { extractRefOffset } from '../../../utils';

@Component({
  selector: 'scl-ref-list',
  templateUrl: './ref-list.component.html',
  styleUrls: ['./ref-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RefListComponent {
  private _refs: Record<string, string> = {};

  @Input() set refs(value: Record<string, string>) {
    this._refs = value ?? {};
    this.entries = Object.entries(this._refs);
  }

  get refs() {
    return this._refs;
  }

  filterQuery = '';
  entries: Array<[string, string]> = [];

  get filteredEntries(): Array<[string, string]> {
    const query = this.filterQuery.trim().toLowerCase();
    if (!query) {
      return this.entries;
    }

    return this.entries.filter(([key, value]) => {
      const formattedKey = this.toRawRefKey(key).toLowerCase();
      return formattedKey.includes(query) || (value ?? '').toLowerCase().includes(query);
    });
  }

  toRawRefKey(key: string): string {
    return extractRefOffset(key);
  }

}
