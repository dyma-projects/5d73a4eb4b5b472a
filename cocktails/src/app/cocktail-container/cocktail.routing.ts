import {RouterModule, Route} from '@angular/router'

import { CocktailsDetailsComponent } from './cocktails-details/cocktails-details.component';
import { CocktailContainerComponent } from './cocktail-container.component';
import { CocktailEditComponent } from './cocktail-edit/cocktail-edit.component';

const COCKTAIL_ROUTES: Route[] =[
    { path: 'cocktails', component: CocktailContainerComponent, children: [
        { path: 'new', component: CocktailEditComponent},
        { path: ':index/edit', component: CocktailEditComponent},
        { path: ':index', component: CocktailsDetailsComponent},
        { path: '', component: CocktailsDetailsComponent}
    ]}
]
export const cocktailRouting = RouterModule.forChild(COCKTAIL_ROUTES)