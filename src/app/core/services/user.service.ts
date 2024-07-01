import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/User';
import { ApiPaginatorResponse } from '../../administrador/interfaces/ApiPaginatorResponse';
import { ApiResponse } from '../../administrador/interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/user';

  async getAll(qs:string):Promise<ApiPaginatorResponse<User>> {
    let url = `http://localhost:3000/user${qs}`;
    
    return await firstValueFrom(this.http.get<ApiPaginatorResponse<User>>(url));
  }

  async register(userData: User): Promise<User> {
    return await firstValueFrom(this.http.post<User>(this.apiUrl, userData));
  }

  async delete(userId:number):Promise<ApiResponse> {
    try {
      let url = `http://localhost:3000/user/${userId}`;
      return await firstValueFrom(this.http.delete<ApiResponse>(url));
    } catch (error) {
      throw error;
    }
  }

}
