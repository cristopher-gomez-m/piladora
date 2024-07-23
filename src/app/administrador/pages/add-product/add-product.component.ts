import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductServicesService } from '../../../core/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, product } from '../../../core/interface/Products/product';
import { Proveedor } from '../../../core/interface/Proveedor/proveedor';
import { ProveedorService } from '../../../core/services/proveedor.service';
import { MarcaService } from '../../../core/services/marca.service';
import { Marca } from '../../../core/interface/Marca/marca';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AddProductComponent implements OnInit {

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

  initForm(): void {
    this.form = this._fb.group({
      // id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      peso: ['', [Validators.required, Validators.min(0.1)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      categoria: ['', [Validators.required]],
      marcaName: ['', [Validators.required]],
      proveedorId: ['1', [Validators.required]],
      // status: [1, [Validators.required]],
      // unit: ['lbs', [Validators.required]]
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
        console.log(data);
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

  saveProduct(event: Event) {
    this.convertWeightToLbs();
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro que deseas guardar?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productservice.crearProductoConStock(this.form.value).subscribe(resp => {
          if (resp) {
            this.messageService.add({ severity: 'info', summary: 'Registrado', detail: 'Producto guardado', life: 3000 });
            this.form.reset(); // Limpiar el formulario
            this.display = false; // Cerrar el diálogo
            this.productAdded.emit(); // Emitir el evento
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el producto', life: 3000 });
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
      console.log(marcas);
    });
  }

  mostrarDialogo() {
    this.display = true;
  }

  get f() {
    return this.form.controls;
  }
}
