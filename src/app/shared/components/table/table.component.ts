import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Accion, TableColumns } from '../../../core/models/tabla-column-action';
import { DynamicPipe } from '../../pipes/pipescolumn-value.pipe';
import { PesoPipe } from '../../pipes/pipeLibr.pipe';


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
    ButtonModule,
    DynamicPipe
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [CurrencyPipe, DatePipe, DecimalPipe, PesoPipe],
})
export class TableComponent implements OnInit {
  @ViewChild('dt2') table: Table | undefined;

  @Input() data: any[] = [];
  @Input() columns!: TableColumns[];
  @Input() globalFilterFields: string[] = [];
  @Input() rows: number = 5;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() showActions: boolean = false;
  @Input() canModify: boolean = false;
  @Input() canDelete: boolean = false;
  @Input() showAddButton: boolean = false;

  @Output() action: EventEmitter<Accion> = new EventEmitter();
  @Output() add: EventEmitter<void> = new EventEmitter();
  @Output() modify: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;

  ngOnInit(): void {}


  onGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const value = inputElement.value;
      this.table?.filterGlobal(value, 'contains');
    }
  }

  onModify(product: any) {
    this.modify.emit(product);
  }

  onDelete(product: any) {
    this.delete.emit(product);
  }

  onAdd() {
    this.add.emit();
  }

  onAction(accion: string, row?: any) {
    this.action.emit({ accion: accion, fila: row });
  }
}
