import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { product } from '../../../core/interface/Products/product';
import { ProductServicesService } from '../../../core/services/product.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { IngresoSalidaService } from '../../../core/services/ingresosSalida.service';

export interface ProductosAddStock {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface CreateProductoStockDTO {
  id_producto: number;
  stock: number;
  tipo: string;
  creado_por: number;
}

@Component({
  selector: 'app-view-product-op',
  templateUrl: './view-product-op.component.html',
  styleUrls: ['./view-product-op.component.css']
})
export class ViewProductOpComponent implements OnInit {

  products: product[] = [];
  columns = [
    { field: 'name', header: 'Codigo', width: '10%' },
    { field: 'peso', header: 'Peso', width: '10%' },
    { field: 'precio', header: 'Precio', width: '10%', pipe: 'currency', pipeArgs: 'USD' },
    { field: 'categoria', header: 'Categoria', width: '15%' },
    { field: 'status', header: 'Estado', width: '15%' }
  ];

  productosAddStock: ProductosAddStock[] = [];
  stateOptions: any[] = [{ label: 'Ingreso', value: 'ingreso' }, { label: 'Salida', value: 'salida' }];
  value: string = 'Ingreso';

  constructor(private productService: ProductServicesService, private stockService: IngresoSalidaService) { }

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
    const existingProduct = this.productosAddStock.find(p => p.id === product.id);
    if (!existingProduct) {
      this.productosAddStock.push({
        id: product.id,
        nombre: product.name,
        cantidad: 1
      });
    } else {
      existingProduct.cantidad += 1;
    }
  }

  onDeleteProduct(product: product) {
    console.log('Delete product', product);
    // Lógica para eliminar un producto
  }

  incrementarCantidad(STOCK: ProductosAddStock): void {
    STOCK.cantidad++;
  }

  decrementarCantidad(STOCK: ProductosAddStock): void {
    if (STOCK.cantidad > 1) {
      STOCK.cantidad--;
    }
  }

  aceptarSeleccion(): void {
    const stockEntries: CreateProductoStockDTO[] = this.productosAddStock.map(producto => ({
      id_producto: producto.id,
      stock: producto.cantidad,
      tipo: this.value,
      creado_por: 1
    }));

    stockEntries.forEach(entry => {
      this.stockService.createStockEntry(entry).subscribe(
        response => {
          console.log('Stock entry created:', response);
        },
        error => {
          console.error('Error creating stock entry', error);
        }
      );
    });

    // Resetea el formulario
    this.productosAddStock = [];
  }
}
