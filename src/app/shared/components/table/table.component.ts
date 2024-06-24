import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Accion } from '../../../core/models/tabla-column-action';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputIconModule,
    FormsModule,
    InputTextModule,
    IconFieldModule,
    ButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @ViewChild('dt2') table: Table | undefined;

  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() rows: number = 10;
  @Input() rowsPerPageOptions: number[] = [10, 25, 50];
  @Input() showActions: boolean = false;
  @Input() canModify: boolean = false;
  @Input() canDelete: boolean = false;

  @Output() action: EventEmitter<Accion> = new EventEmitter();

  ngOnInit(): void {}

  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      this.table?.filterGlobal(value, 'contains');
    }
  }

  onModify(product: any) {
    console.log('Modify', product);
  }

  onDelete(product: any) {
    console.log('Delete', product);
  }

  onAction(accion: string, row?:any){
    this.action.emit({accion: accion, fila:row});
  }
}
