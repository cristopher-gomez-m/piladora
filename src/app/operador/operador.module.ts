import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductOpComponent } from './pages/view-product-op/view-product-op.component';
import { EditProductOpComponent } from './pages/edit-product-op/edit-product-op.component';
import { OperadorRoutingModule } from './operador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from '../shared/components/table/table.component';
import { MaterialModule } from '../material/material.module';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    EditProductOpComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    OperadorRoutingModule,
    HttpClientModule,
    TableComponent,
    MaterialModule,
    ButtonModule
  ],
  exports: [
    EditProductOpComponent,
    HomeComponent
  ]
})
export class OperadorModule { }
