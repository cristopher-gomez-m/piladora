import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from '../../../core/interface/Products/product';
import { ProductServicesService } from '../../../core/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ViewProductComponent implements OnInit {

  @ViewChild(AddProductComponent) addProduct!: AddProductComponent;
  @ViewChild(EditProductComponent) edtProduct!: EditProductComponent;
  displayDelete: boolean = false;
  productToDeleteId!: number;

  products: product[] = [];
  columns = [
    { field: 'name', header: 'Name', width: '10%' },
    { field: 'peso', header: 'Peso', width: '10%' }, // pipe: 'kg'
    { field: 'precio', header: 'Precio', width: '10%', pipe: 'currency', pipeArgs: 'USD' },
    { field: 'categoria', header: 'Categoria', width: '15%' },
    { field: 'status', header: 'Status', width: '15%' }
  ];

  constructor(private productService: ProductServicesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onAddProduct() {
    this.addProduct.mostrarDialogo();
  }

  onProductAdded() {
    this.getProducts();
  }

  onModifyProduct(product: product) {
    this.edtProduct.mostrarDialogo(product);
  }

  onDeleteProduct(product: product) {
    this.productToDeleteId = product.id;
    this.displayDelete = true;
  }

  deleteProduct(event: Event) {
    console.log(this.productToDeleteId)

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Esta eliminacion no se podra deshacer?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productService.deleteProduct(this.productToDeleteId).subscribe(response => {
            if (response) {
              this.messageService.add({ severity: 'info', summary: 'Eliminado', detail: 'Problemas comunicarce con el administrador', life: 3000 });
              this.displayDelete = false;
              this.getProducts();
              console.log(response);
            } else {
              console.log(response);
            }
          });
        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Sin novedades', life: 3000 });
        }
      });
  }
}
