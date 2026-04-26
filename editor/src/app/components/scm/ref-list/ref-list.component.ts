import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  extractRefOffset,
  getRoutePath,
  normalizeScmPath,
  sortRefs,
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
  private knownRefNames = new Set<string>();
  private scmTargetPathByName = new Map<string, string>();

  @Input() set map(value: ScmMap | null) {
    this._map = value;
    this.knownRefNames.clear();
    this.scmTargetPathByName.clear();
    if (value) {
      const mainEntry = value.files.find((file) => file.pid === 0);
      if (mainEntry?.name?.startsWith('ref.')) {
        this.knownRefNames.add(mainEntry.name);
      }

      for (const refName of Object.keys(value.xrefs ?? {})) {
        this.knownRefNames.add(refName);
      }

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
    const entries = sortRefs(this.refs);
    if (!query) {
      return entries;
    }

    return entries.filter(({ key, value }) => {
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

  isOrphanRef(refName: string): boolean {
    return !!this.map && !this.knownRefNames.has(refName);
  }

  getScmTargetPath(refName: string) {
    const filePath = this.scmTargetPathByName.get(refName);
    if (filePath) {
      return { route: getRoutePath(this.game, normalizeScmPath(filePath)) };
    }

    // local label, try to find it in xrefs
    const xrefs = this.map?.xrefs?.[refName];
    const firstXref = xrefs?.[0];
    if (firstXref) {
      const [fileIndex] = firstXref.split(':');
      const file = this.map?.files?.[Number(fileIndex)];
      if (file?.path) {
        return {
          route: getRoutePath(this.game, normalizeScmPath(file.path)),
          fragment: 'label-' + extractRefOffset(refName),
        };
      }
    }

    return null;
  }
}
