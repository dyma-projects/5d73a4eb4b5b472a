import { Pipe, PipeTransform } from '@angular/core';
import {Cocktail} from '../models/cocktail.model'
import { CocktailContainerComponent } from 'src/app/cocktail-container/cocktail-container.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(cockails: Cocktail[], search: string): Cocktail[] | null {
    if (!search.length) {
      return cockails;
    } else {
      return cockails.filter( c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
    return null;
  }

}
