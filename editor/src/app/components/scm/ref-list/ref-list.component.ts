import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  extractRefOffset,
  getRoutePath,
  normalizeScmPath,
} from '../../../utils';
import { KeyValueEntry, ScmMap } from '../model';

@Component({
  selector: 'scl-ref-list',
  templateUrl: './ref-list.component.html',
  styleUrls: ['./ref-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RefListComponent {
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

  @Input() refs: KeyValueEntry[] = [];
  @Input() game!: string;
  filterQuery = '';

  get filteredEntries(): KeyValueEntry[] {
    const query = this.filterQuery.trim().toLowerCase();
    if (!query) {
      return this.refs;
    }

    return this.refs.filter(({ key, value }) => {
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
