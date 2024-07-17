import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit{
  display: boolean = false;
  product: any = {
    precio: 0
  };
  unit: string = 'lbs';

  categorias:any = [];

  proveedores = [
    { label: 'Proveedor 1', value: 1 },
    { label: 'Proveedor 2', value: 2 },
    { label: 'Proveedor 3', value: 2 },
    { label: 'Proveedor 4', value: 2 },
    { label: 'Proveedor 5', value: 2 },
    { label: 'Proveedor 6', value: 2 },
    { label: 'Proveedor 7', value: 2 },
    { label: 'Proveedor 8', value: 2 },
    { label: 'Proveedor 9', value: 2 }
  ];

  marcas = [
    { label: 'Marca 1', value: 'marca1' },
    { label: 'Marca 2', value: 'marca2' }
  ];

  convert = [
    { name: 'kg', code: 'kg' },
    { name: 'lbs', code: 'lbs' }
  ]

    ngOnInit() {
        this.categorias = [
          { name: 'Blanco', code: 'blanco' },
          { name: 'Integral', code: 'integral' }
        ];
    }


  constructor(private productService: ProductServicesService) { }

  convertWeight() {

    switch (this.unit) {
      case 'kg':
        this.product.peso = (this.product.peso * 2.20462).toFixed(2);
        break;

      case 'lbs':
        this.product.peso = (this.product.peso / 2.20462).toFixed(2);
        break;

      default:
        break;
    }
  }

  saveProduct() {
    // Save product logic here
    console.log('Product saved', this.product);
    this.display = false;
  }

  mostrarDialogo() {
    this.display = true;
  }
}
