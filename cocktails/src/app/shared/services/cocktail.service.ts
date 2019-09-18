import { Injectable } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';
import { BehaviorSubject, Observable } from 'rxjs'
import { Ingredient } from '../models/ingredient.model';
import { HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class CocktailService {
  public cocktails: BehaviorSubject<Cocktail[]> = new BehaviorSubject(null);
  // [
  //   new Cocktail(
  //     'Mojito','https://cdn.liquor.com/wp-content/uploads/2019/07/10134111/Bacardi_Mojito_Drink-feature.jpg',
  //     "D'origine cubaine, le mojito est une boisson alcoolisée composée de rhum, de citron vert, de feuilles de menthe, de sucre de canne et d'eau gazeuse. Parfois, quelques glaçons viennent rafraîchir le mélange",
  //     [
  //       new Ingredient('perrier',1),
  //       new Ingredient('citron',2),
  //       new Ingredient('sucre',3)
  //     ]),
  //   new Cocktail(
  //     'Margarita',
  //     'http://s3-eu-west-1.amazonaws.com/jamieoliverprod/_int/rdb2/upload/1198_1_1403268483_lrg.jpg',
  //     'description Margarirta',
  //     [
  //       new Ingredient('pulco',1),
  //       new Ingredient('citron',2),
  //       new Ingredient('ananas',1),
  //       new Ingredient('sucre',3)
  //   ]),
  //   new Cocktail(
  //     'Sour','https://cdn.diffords.com/contrib/stock-images/2018/05/5af2fe03a065b.jpg',
  //     'description Sour',
  //     [
  //       new Ingredient('perrier',1),
  //       new Ingredient('jus de fraise',2)
  //     ])
  // ])
    
  constructor(private http: HttpClient) {
    this.initCocktails();
  }
    // this.http.put('https://cocktails-381f4.firebaseio.com/cocktails.json', this.cocktails.value)
    // .subscribe(res => console.log(res)); 
  
  initCocktails(): void {
    this.http.get<Cocktail[]>('https://cocktails-381f4.firebaseio.com/cocktails.json').subscribe((cocktails: Cocktail[]) => {
      this.cocktails.next(cocktails);
    })
  }

  getCocktail(index: number): Observable<Cocktail> {
    return this.cocktails.pipe(
      filter(cocktails => cocktails != null),
      map(cocktails => cocktails[index]))
  }

  addCocktail(cocktail: Cocktail) {
    const cocktails = this.cocktails.value;
    cocktails.push({name: cocktail.name, img: cocktail.img, desc: cocktail.desc, ingredients: cocktail.ingredients})
    this.cocktails.next(cocktails);
    this.save();
  }

  editCocktail(editCocktail: Cocktail): void {
    const cocktails = this.cocktails.value.slice();
    //const index = cocktails.map( c => c.name).indexOf(editCocktail.name);
    let index = cocktails.findIndex(c => c.name === editCocktail.name);
    cocktails[index] = editCocktail;
    this.cocktails.next(cocktails);
    this.save();
  }
  save():void{
    this.http.put('https://cocktails-381f4.firebaseio.com/cocktails.json',this.cocktails.value).subscribe();
  }
 }