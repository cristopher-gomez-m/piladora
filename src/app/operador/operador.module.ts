import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductOpComponent } from './pages/view-product-op/view-product-op.component';
import { EditProductOpComponent } from './pages/edit-product-op/edit-product-op.component';
import { OperadorRoutingModule } from './operador-routing.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ViewProductOpComponent,
    EditProductOpComponent
  ],
  imports: [
    CommonModule,
    OperadorRoutingModule,
    MaterialModule
  ]
})
export class OperadorModule { }
