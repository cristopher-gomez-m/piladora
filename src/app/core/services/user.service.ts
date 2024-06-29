import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  async getAll():Promise<User[]> {
    let url = 'http://localhost:3000/user';
    return await firstValueFrom(this.http.get<User[]>(url));
  }
}
