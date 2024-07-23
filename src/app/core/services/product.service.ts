import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { product } from '../interface/Products/product';
import { CreateProductoDTO, ModifaProductoDTO } from '../interface/Products/CreateProductoDTO';
import { ApiResponse } from '../../administrador/interfaces/ApiResponse';

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
  crearProductoConStock(productoStock: CreateProductoDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/add`, productoStock);
  }

  updateProduct(id: number, updatedProduct: ModifaProductoDTO): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, updatedProduct);
  }

  // Eliminar un producto (cambia el estado a 'E')
  deleteProduct(id: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/delete/${id}`,{});
  }
}
