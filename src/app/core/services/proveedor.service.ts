import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../interface/Proveedor/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiUrl = 'http://localhost:3000/proveedor';

  constructor(private http:HttpClient) { }

  getProveedores() {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

}
