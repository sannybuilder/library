import { Pipe, PipeTransform } from '@angular/core';
import { Game, ViewContext } from '../models';

@Pipe({
  name: 'linkifyClasses',
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
        `<a href="#/${game}/${
          viewContext === ViewContext.Code ? 'native' : 'script'
        }/classes/${className}">$&</a>`
      );
    });

    return text;
  }
}
