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

  async getAll(): Promise<User[]> {
    return await firstValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  async register(userData: User): Promise<User> {
    return await firstValueFrom(this.http.post<User>(this.apiUrl, userData));
  }

}
