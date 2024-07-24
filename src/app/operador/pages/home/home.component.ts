import { Component, OnInit } from '@angular/core';
import { Datum } from '../../../core/interface/ingresossalidas/IngresosSalidas';
import { IngresoSalidaService } from '../../../core/services/ingresosSalida.service';
import { ProductServicesService } from '../../../core/services/product.service';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lastIngreso: Datum | null = null;
  lastSalida: Datum | null = null;
  allIngresos: Datum[] = [];
  allSalidas: Datum[] = [];
  data: ChartData<'line'> | undefined;
  pieData: ChartData<'pie'> | undefined;
  options: any;
  pieOptions: any;
  filteredProducts: any[] = [];
  products: any[] = [];

  constructor(
    private ingresoSalidaService: IngresoSalidaService,
    private productServicesService: ProductServicesService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    const idProducto = 20; // Default product ID

    this.loadChartData(idProducto);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    this.pieOptions = {
        cutout: '60%',
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };
  }



  loadProducts(): void {
    this.productServicesService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
      },
      error => console.error('Error fetching products:', error)
    );
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(query));
  }

  onProductSelect(idProducto: number): void {
    this.loadChartData(idProducto);
  }

  loadChartData(idProducto: number): void {
    this.ingresoSalidaService.findLastIngreso(idProducto).subscribe(
      (response) => {
        this.lastIngreso = response.data;
        this.updateChart();
        this.updatePieChart();
      },
      error => console.error('Error fetching last ingreso:', error)
    );

    this.ingresoSalidaService.findLastSalida(idProducto).subscribe(
      (response) => {
        this.lastSalida = response.data;
        this.updateChart();
        this.updatePieChart();
      },
      error => console.error('Error fetching last salida:', error)
    );

    this.ingresoSalidaService.findAllIngresos(idProducto).subscribe(
      (response) => {
        this.allIngresos = response.data;
        this.updateChart();
      },
      error => console.error('Error fetching all ingresos:', error)
    );

    this.ingresoSalidaService.findAllSalidas(idProducto).subscribe(
      (response) => {
        this.allSalidas = response.data;
        this.updateChart();
      },
      error => console.error('Error fetching all salidas:', error)
    );
  }

  updateChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: this.allIngresos.map(item => item.fecha_creacion.toString().substring(0, 10)),
      datasets: [
        {
          label: 'Ingresos',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: this.allIngresos.map(item => item.stock),
        },
        {
          label: 'Salidas',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          borderColor: documentStyle.getPropertyValue('--green-500'),
          data: this.allSalidas.map(item => item.stock),
        }
      ]
    };
  }

  updatePieChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.pieData = {
      labels: ['Último Ingreso', 'Última Salida'],
      datasets: [
        {
          data: [this.lastIngreso ? this.lastIngreso.stock : 0, this.lastSalida ? this.lastSalida.stock : 0],
          backgroundColor: [
            documentStyle.getPropertyValue('--pink-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--pink-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };
  }
}
