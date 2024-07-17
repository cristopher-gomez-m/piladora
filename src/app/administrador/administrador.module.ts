import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { ViewReportComponent } from './pages/view-report/view-report.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { TableComponent } from '../shared/components/table/table.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    ViewReportComponent,
    AddProductComponent,
    EditProductComponent,
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    EditUserComponent,
    AdministradorRoutingModule,
    AddUserComponent,
    ViewUserComponent,
    TableComponent,
    MaterialModule
  ]
})
export class AdministradorModule { }
