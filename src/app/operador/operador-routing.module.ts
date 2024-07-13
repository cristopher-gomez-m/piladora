import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductOpComponent } from './pages/edit-product-op/edit-product-op.component';
import { ViewProductOpComponent } from './pages/view-product-op/view-product-op.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'editar-producto',
    component: EditProductOpComponent
  },
  {
    path: 'productos',
    component: ViewProductOpComponent
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
export class OperadorRoutingModule { }
