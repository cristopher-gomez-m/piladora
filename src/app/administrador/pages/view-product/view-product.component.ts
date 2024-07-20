import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from '../../../core/interface/Products/product';
import { ProductServicesService } from '../../../core/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  @ViewChild(AddProductComponent) addProduct!: AddProductComponent;

  products: product[] = [];
  columns = [
    { field: 'name', header: 'Name', width: '10%' },
    { field: 'peso', header: 'Peso', width: '10%', pipe: 'kg' },
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
      this.addProduct.mostrarDialogo();
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
