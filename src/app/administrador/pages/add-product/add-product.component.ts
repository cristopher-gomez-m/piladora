import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from '../../../core/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, product } from '../../../core/interface/Products/product';
import { Proveedor } from '../../../core/interface/Proveedor/proveedor';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Marca } from '../../../core/interface/Marca/marca';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AddProductComponent implements OnInit {
  display: boolean = false;
  product: any = [];
  unit: string = 'lbs';

  categorias: any = [];

  proveedores: Proveedor[] = [];

  marcas: Marca[] = [];

  convert = [
    { name: 'kg', code: 'kg' },
    { name: 'lbs', code: 'lbs' }
  ];

  form!: FormGroup;

  initForm(): void {
    this.form = this._fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      precio: [0, [Validators.required]],
      categoria: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      proveedor: ['', [Validators.required]],
      status: [1, [Validators.required]],
      unit: ['lbs', [Validators.required]]
    });

    this.form.get('proveedor')?.valueChanges.subscribe(value => {
      this.updateMarca(value);
    });
  }

  ngOnInit() {

    this.categorias = [
      { name: 'Blanco', code: 'blanco' },
      { name: 'Integral', code: 'integral' }
    ];

    this.proveedorService.getProveedores().subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching proveedor', error);
      }
    );


    this.initForm();
  }

  constructor(private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _fb: FormBuilder,
    private productservice: ProductServicesService,
    private proveedorService: ProveedorService,
    private marcaService: MarcaService) { }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  convertWeight() {
    const pesoControl = this.form.get('peso');
    const unitControl = this.form.get('unit');
    if (pesoControl && unitControl) {
      const peso = pesoControl.value;
      switch (unitControl.value) {
        case 'kg':
          pesoControl.setValue((peso * 2.20462).toFixed(2));
          break;
        case 'lbs':
          pesoControl.setValue((peso / 2.20462).toFixed(2));
          break;
        default:
          break;
      }
    }
  }

  saveProduct(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Product saved', life: 3000 });
        this.productservice.postProducts(this.form.value).subscribe(resp => {
          if (resp) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Se ha aceptado', life: 3000 });
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Intentelo mas tarde', life: 3000 });
          }
          this.display = false;
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  updateMarca(proveedorId: number) {
    this.marcaService.getMarcasByProveedor(proveedorId).subscribe((marcas:Marca[]) => {
      this.marcas= marcas;
      console.log(marcas)
    });
  }

  mostrarDialogo() {
    this.display = true;
  }
}
