import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonModule,
    DropdownModule,
    FormsModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    InputTextModule,
    PasswordModule,
    TableModule,
    ToolbarModule,
    DialogModule,

  ]
})
export class MaterialModule { }
