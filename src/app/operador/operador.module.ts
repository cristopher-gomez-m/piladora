import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductOpComponent } from './pages/view-product-op/view-product-op.component';
import { EditProductOpComponent } from './pages/edit-product-op/edit-product-op.component';
import { OperadorRoutingModule } from './operador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from '../shared/components/table/table.component';


@NgModule({
  declarations: [
    EditProductOpComponent
  ],
  imports: [
    CommonModule,
    OperadorRoutingModule,
    HttpClientModule,
    TableComponent
  ],
  exports: [
    EditProductOpComponent
  ]
})
export class OperadorModule { }
