import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  standalone: true,
  imports: [CommonModule, TableComponent],
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
    products = [
      { id: 1, name: 'Product A', price: 30 },
      { id: 2, name: 'Product B', price: 20 },
      { id: 3, name: 'Product C', price: 50 }
    ];

    columns = [
      { field: 'name', header: 'Name', width: '40%' },
      { field: 'price', header: 'Price', width: '20%' }
    ];

    globalFilterFields = ['name'];
}
