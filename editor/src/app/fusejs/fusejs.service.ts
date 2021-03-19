import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { get, set, omit, cloneDeep } from 'lodash';

export interface AngularFusejsOptions extends Fuse.FuseOptions {
  supportHighlight?: boolean;
  fusejsHighlightKey?: string;
  minSearchTermLength?: number;
  maximumScore?: number;
}

@Injectable({ providedIn: 'root' })
export class FusejsService {
  private defaultOptions: AngularFusejsOptions = {
    supportHighlight: true,
    shouldSort: false,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    includeScore: true,
    minSearchTermLength: 3,
    fusejsHighlightKey: 'fuseJsHighlighted',
  };

  searchList(
    list: Array<any>,
    searchTerms: string,
    options: AngularFusejsOptions = {}
  ) {
    const fuseOptions: AngularFusejsOptions = Object.assign(
      this.defaultOptions,
      options
    );
    let result = [];

    // hack for opcode search
    if (searchTerms?.length === 4 && searchTerms[0] === '0') {
      fuseOptions.threshold = 0.0;
    }

    if (searchTerms && searchTerms.length >= fuseOptions.minSearchTermLength) {
      if (fuseOptions.supportHighlight) {
        fuseOptions.includeMatches = true;
      }

      const fuse = new Fuse(list, fuseOptions);
      result = fuse.search(searchTerms);
      if (fuseOptions.supportHighlight) {
        result = this.handleHighlight(result, fuseOptions);
      }
    } else {
      result = cloneDeep(list);

      if (fuseOptions.supportHighlight) {
        result.forEach((element) => {
          element[fuseOptions.fusejsHighlightKey] = omit(
            cloneDeep(element),
            fuseOptions.fusejsHighlightKey
          );
        });
      }
    }

    return result;
  }

  private handleHighlight(result: any[], options: AngularFusejsOptions) {
    if (options.maximumScore && options.includeScore) {
      result = result.filter((matchObject) => {
        return matchObject.score <= options.maximumScore;
      });
    }

    return result.map((matchObject) => {
      const item = cloneDeep(matchObject.item);
      item[options.fusejsHighlightKey] = omit(
        cloneDeep(item),
        options.fusejsHighlightKey
      );
      for (let match of matchObject.matches) {
        const indices: number[][] = match.indices;

        let highlightOffset: number = 0;

        let key: string = match.key;
        if (get(item[options.fusejsHighlightKey], key).constructor === Array) {
          key += `[${match.arrayIndex}]`;
        }

        for (let indice of indices) {
          let initialValue = get(
            item[options.fusejsHighlightKey],
            key
          ).toString();

          const startOffset = indice[0] + highlightOffset;
          const endOffset = indice[1] + highlightOffset + 1;
          let highlightedTerm = initialValue.substring(startOffset, endOffset);
          let newValue =
            initialValue.substring(0, startOffset) +
            '<em>' +
            highlightedTerm +
            '</em>' +
            initialValue.substring(endOffset);
          highlightOffset += '<em></em>'.length;
          set(item[options.fusejsHighlightKey], key, newValue);
        }
      }

      return item;
    });
  }
}
