import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../interface/Marca/marca';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private apiUrl = 'http://localhost:3000/marca';

  constructor(private http: HttpClient) { }

  getMarcasByProveedor(proveedorId: number): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}/proveedor?proveedorId=${proveedorId}`);
  }
}
