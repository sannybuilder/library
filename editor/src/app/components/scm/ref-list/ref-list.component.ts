import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  extractRefOffset,
  getRoutePath,
  normalizeScmPath,
} from '../../../utils';
import { ScmMap } from '../model';

@Component({
  selector: 'scl-ref-list',
  templateUrl: './ref-list.component.html',
  styleUrls: ['./ref-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RefListComponent {
  private _refs: Record<string, string> = {};
  private _map: ScmMap | null = null;
  private scmTargetPathByName = new Map<string, string>();

  @Input() set map(value: ScmMap | null) {
    this._map = value;
    this.scmTargetPathByName.clear();
    if (value) {
      for (const file of value.files) {
        this.scmTargetPathByName.set(file.name, file.path);
      }
    }
  }

  get map() {
    return this._map;
  }

  @Input() set refs(value: Record<string, string>) {
    this._refs = value ?? {};
    this.entries = Object.entries(this._refs);
  }

  @Input() game!: string;

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
      return (
        formattedKey.includes(query) ||
        (value ?? '').toLowerCase().includes(query)
      );
    });
  }

  toRawRefKey(key: string): string {
    return extractRefOffset(key);
  }

  getScmTargetPath(refName: string) {
    let targetPath = this.scmTargetPathByName.get(refName);
    if (!targetPath) {
      return null;
    }

    return getRoutePath(this.game, normalizeScmPath(targetPath));
  }
}
