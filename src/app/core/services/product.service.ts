import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interface/product';

@Injectable({ providedIn: 'root' })

export class ProductServicesService {

  private apiUrl = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.apiUrl);
  }
}
