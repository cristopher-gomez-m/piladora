
import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/page-product-render/page-product-render.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default PRODUCT_ROUTES;
