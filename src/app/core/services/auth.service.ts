import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async login(username:string,password:string){
    let url = 'http://localhost:3000/auth/login';
    const body = {username,password};
    return await firstValueFrom(this.http.post(url,body));
  }
}
