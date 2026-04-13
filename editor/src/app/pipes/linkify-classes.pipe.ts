import { Pipe, PipeTransform } from '@angular/core';
import { Game, ViewContext } from '../models';
import { getContextRouteSegment } from '../utils';

@Pipe({
    name: 'linkifyClasses',
    standalone: false
})
export class LinkifyClassesPipe implements PipeTransform {
  transform(
    text: string,
    game: Game,
    classes: string[],
    viewContext: ViewContext
  ) {
    if (!text) {
      return '';
    }

    classes.forEach((className) => {
      // don't match if the class is inside an html tag
      text = text.replace(
        new RegExp(`(\\b${className}\\b)(?!([^<]+)?>)`, 'i'),
        `<a href="#/${game}/${getContextRouteSegment(viewContext)}/classes/${className}">$&</a>`
      );
    });

    return text;
  }
}
