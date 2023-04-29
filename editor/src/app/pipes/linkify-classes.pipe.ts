import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models';

@Pipe({
  name: 'linkifyClasses',
})
export class LinkifyClassesPipe implements PipeTransform {
  transform(text: string, game: Game, classes: string[]) {
    if (!text) {
      return '';
    }

    classes.forEach((className) => {
      text = text.replace(
        new RegExp(`\\b${className}\\b`, 'i'),
        `<a href="#/${game}/classes/${className}">$&</a>`
      );
    });

    return text;
  }
}
