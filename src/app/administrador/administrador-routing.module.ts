import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'agregar-producto',
    component: AddProductComponent
  },
  {
    path: 'editar-producto',
    component: EditProductComponent
  },
  {
    path: 'productos',
    component: ViewProductComponent
  },
  {
    path: 'agregar-usuario',
    component: AddUserComponent
  },
  {
    path: 'editar-usuario',
    component: EditUserComponent
  },
  {
    path: 'usuarios',
    component: ViewUserComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdministradorRoutingModule { }




