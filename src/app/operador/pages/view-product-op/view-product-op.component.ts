import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-view-product-op',
  templateUrl: './view-product-op.component.html',
  standalone: true,
  imports: [CommonModule, TableComponent],
  styleUrls: ['./view-product-op.component.css']
})
export class ViewProductOpComponent {
  products = [
    { id: 1, name: 'Arros A', peso: 40, precio: 50.8, categoria: 'blanco', status: 1 },
    { id: 2, name: 'Arros B', peso: 35, precio: 45.3, categoria: 'blanco', status: 1 },
    { id: 3, name: 'Arros C', peso: 50, precio: 60.7, categoria: 'integral', status: 1 },
    { id: 4, name: 'Arros D', peso: 45, precio: 55.2, categoria: 'integral', status: 1 },
    { id: 5, name: 'Arros E', peso: 38, precio: 48.5, categoria: 'blanco', status: 1 },
    { id: 6, name: 'Arros F', peso: 42, precio: 52.9, categoria: 'blanco', status: 1 },
    { id: 7, name: 'Arros G', peso: 47, precio: 58.1, categoria: 'integral', status: 1 },
    { id: 8, name: 'Arros H', peso: 33, precio: 43.0, categoria: 'blanco', status: 1 },
    { id: 9, name: 'Arros I', peso: 36, precio: 46.5, categoria: 'integral', status: 1 },
    { id: 10, name: 'Arros J', peso: 39, precio: 49.8, categoria: 'blanco', status: 1 },
    { id: 11, name: 'Arros K', peso: 41, precio: 51.5, categoria: 'integral', status: 1 },
];

    columns = [
      { field: 'name', header: 'Name', width: '20%' },
      { field: 'peso', header: 'peso', width: '10%' },
      { field: 'precio', header: 'precio', width: '10%', pipe: 'currency', pipeArgs: 'USD' },
      { field: 'categoria', header: 'categoria', width: '15%' },
      { field: 'status', header: 'status', width: '10%' }
    ];

    onAddProduct() {
      console.log('Add product');
      // Lógica para agregar un producto
    }

    onModifyProduct(product: any) {
      console.log('Modify product', product);
      // Lógica para modificar un producto
    }

    onDeleteProduct(product: any) {
      console.log('Delete product', product);
      // Lógica para eliminar un producto
    }

    // deleteProduct(id: number) {
    //   this.products = this.products.filter(product => product.id !== id);
    // }
}
