import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { product } from '../../../core/interface/product';
import { ProductServicesService } from '../../../core/services/product.service';

@Component({
  selector: 'app-view-product-op',
  templateUrl: './view-product-op.component.html',
  standalone: true,
  imports: [CommonModule, TableComponent],
  styleUrls: ['./view-product-op.component.css']
})
export class ViewProductOpComponent implements OnInit {

  products: product[] = [];
  columns = [
    { field: 'name', header: 'Name', width: '10%' },
    { field: 'peso', header: 'Peso', width: '10%' },
    { field: 'precio', header: 'Precio', width: '10%', pipe: 'currency', pipeArgs: 'USD' },
    { field: 'categoria', header: 'Categoria', width: '15%' },
    { field: 'status', header: 'Status', width: '15%' }
  ];

  constructor(private productService: ProductServicesService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: product[]) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onAddProduct() {
    console.log('Add product');
    // Lógica para agregar un producto
  }

  onModifyProduct(product: product) {
    console.log('Modify product', product);
    // Lógica para modificar un producto
  }

  onDeleteProduct(product: product) {
    console.log('Delete product', product);
    // Lógica para eliminar un producto
  }
}
