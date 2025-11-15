import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
       // component: HomePageComponent,
      },

      {
        path: 'gender/:gender',
        //component: GenderPageComponent,
      },
      {
        path: 'product/:idSlug',
        //component: ProductPageComponent,
      },

      {
        path: '**',
        //component: NotFoundPageComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

export default storeFrontRoutes;
