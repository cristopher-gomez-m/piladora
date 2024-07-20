import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { product } from '../interface/Products/product';
import { CreateProductoDTO } from '../interface/Products/CreateProductoDTO';

@Injectable({ providedIn: 'root' })

export class ProductServicesService {

  private apiUrl = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<product[]> {
    return this.http.get<product[]>(this.apiUrl);
  }


  postProducts(new_product: CreateProductoDTO): Observable<product> {
    return this.http.post(this.apiUrl,new_product).pipe(
      map((data: any) => { return data})
    )
  }

  // Método para crear un nuevo producto y agregar el stock
  crearProductoConStock(productoStock: CreateProductoDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, productoStock);
  }

}
