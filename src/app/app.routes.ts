import { PRODUCT_ROUTES } from './Product/product-routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import ('./administrador/administrador.module').then( m => m.AdministradorModule)
  },
  {
    path: 'operador',
    loadChildren: () => import ('./operador/operador.module').then( m => m.OperadorModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./Product/product-routes')
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }




