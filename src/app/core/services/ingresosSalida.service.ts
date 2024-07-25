import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductoStockDTO, Datum, Ingresossalidas } from '../interface/ingresossalidas/IngresosSalidas';

@Injectable({
  providedIn: 'root'
})
export class IngresoSalidaService {
  private apiUrl = 'http://localhost:3000/ingresosSalidasStock'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener el último ingreso para un producto
  findLastIngreso(id_producto: number): Observable<Ingresossalidas<Datum>> {
    return this.http.get<Ingresossalidas<Datum>>(`${this.apiUrl}/ultimo-ingreso/${id_producto}`);
  }

  // Obtener la última salida para un producto
  findLastSalida(id_producto: number): Observable<Ingresossalidas<Datum>> {
    return this.http.get<Ingresossalidas<Datum>>(`${this.apiUrl}/ultima-salida/${id_producto}`);
  }

  // Obtener todos los ingresos para un producto
  findAllIngresos(id_producto: number): Observable<Ingresossalidas<Datum[]>> {
    return this.http.get<Ingresossalidas<Datum[]>>(`${this.apiUrl}/ingresos/${id_producto}`);
  }

  // Obtener todas las salidas para un producto
  findAllSalidas(id_producto: number): Observable<Ingresossalidas<Datum[]>> {
    return this.http.get<Ingresossalidas<Datum[]>>(`${this.apiUrl}/salidas/${id_producto}`);
  }

  createStockEntry(stockEntry: CreateProductoStockDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, stockEntry);
  }
}
