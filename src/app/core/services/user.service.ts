import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/user';

  async getAll(qs:string):Promise<any> {
    let url = `http://localhost:3000/user${qs}`;
    
    return await firstValueFrom(this.http.get<any>(url));
  }

  async register(userData: User): Promise<User> {
    return await firstValueFrom(this.http.post<User>(this.apiUrl, userData));
  }

}
