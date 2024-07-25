import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductServicesService } from '../../../core/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proveedor } from '../../../core/interface/Proveedor/proveedor';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Marca } from '../../../core/interface/Marca/marca';
import { Message } from 'primeng/api';
import { product } from '../../../core/interface/Products/product';
import { ModifaProductoDTO } from '../../../core/interface/Products/CreateProductoDTO';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditProductComponent implements OnInit {

  @Output() productAdded = new EventEmitter<void>();
  messages: Message[] | undefined;
  display: boolean = false;
  unit: string = 'lbs';

  categorias: any = [];

  proveedores: Proveedor[] = [];

  marcas: Marca[] = [];

  convert = [
    { name: 'kg', code: 'kg' },
    { name: 'lbs', code: 'lbs' }
  ];

  form!: FormGroup;
  originalWeight: number = 0;
  productId: number = 0;

  initForm(): void {
    this.form = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      peso: ['', [Validators.required, Validators.min(0.1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      categoria: ['', [Validators.required]],
      marcaName: ['', [Validators.required]],
      proveedorId: ['', [Validators.required]],
    });

    this.form.get('proveedorId')?.valueChanges.subscribe(value => {
      this.updateMarca(value);
    });

    this.form.get('peso')?.valueChanges.subscribe(value => {
      this.originalWeight = parseFloat(value);
    });
  }

  ngOnInit() {
    this.categorias = [
      { name: 'Blanco', value: 'blanco' },
      { name: 'Integral', value: 'integral' }
    ];

    this.proveedorService.getProveedores().subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
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

              updateProduct(event: Event) {
                this.convertWeightToLbs();
                const updatedProduct: ModifaProductoDTO = {
                  name: this.form.value.name,
                  id_marca: this.marcas.find(marca => marca.name === this.form.value.marcaName)?.id || 0,
                  peso: this.form.value.peso,
                  precio: this.form.value.precio,
                  creado_por: 1, // Or the appropriate value
                  categoria: this.form.value.categoria,
                  status: 'A', // Or the appropriate value
                };

                this.confirmationService.confirm({
                  target: event.target as EventTarget,
                  message: '¿Estas seguro que deseas guardar?',
                  icon: 'pi pi-exclamation-triangle',
                  accept: () => {
                    this.productservice.updateProduct( this.productId , updatedProduct).subscribe(response => {
                      if (response) {
                        this.messageService.add({ severity: 'info', summary: 'Actualizar', detail: 'deseas actualizar', life: 3000 });
                        this.display = false;
                        this.productAdded.emit(); // Emitir el evento
                        console.log(response);
                      } else {
                        console.log(response);
                      }
                    });
                  },
                  reject: () => {
                    this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Vuelve a intentarlo', life: 3000 });
                  }
                });
              }

  convertWeight() {
    const pesoControl = this.form.get('peso');
    if (pesoControl) {
      const peso = this.originalWeight;
      if (this.unit === 'kg') {
        const converted = parseFloat((peso * 2.20462).toFixed(2));
        pesoControl.setValue(converted);
        this.unit = 'lbs';
      } else if (this.unit === 'lbs') {
        const converted = parseFloat((peso / 2.20462).toFixed(2));
        pesoControl.setValue(converted);
        this.unit = 'kg';
      }
    }
  }

  convertWeightToLbs() {
    const pesoControl = this.form.get('peso');
    if (pesoControl && this.unit === 'kg') {
      const peso = this.originalWeight;
      pesoControl.setValue((peso * 2.20462).toFixed(2));
      this.unit = 'lbs';
    }
  }

  updateMarca(proveedorId: number) {
    this.marcaService.getMarcasByProveedor(proveedorId).subscribe((marcas: Marca[]) => {
      this.marcas = marcas;
    });
  }

  mostrarDialogo(product: product) {
    this.productId = product.id;
    this.form.patchValue({
      id: product.id,
      name: product.name,
      peso: product.peso,
      precio: product.precio,
      categoria: product.categoria,
      marcaName: product.id_marca.name,
      proveedorId: product.id_marca.id_proveedor?.id,
    });
    this.originalWeight = product.peso;
    this.display = true;
  }

  get f() {
    return this.form.controls;
  }
}
