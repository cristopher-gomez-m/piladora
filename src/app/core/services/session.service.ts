import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenKey = 'auth_token';
  private userIdKey = 'user_id';
  private roleKey = 'user_role';

  // Inicializa el BehaviorSubject con el estado inicial
  private tokenSubject = new BehaviorSubject<string>(this.getFromSessionStorage(this.tokenKey) || '');
  private userIdSubject = new BehaviorSubject<number>(Number(this.getFromSessionStorage(this.userIdKey)) || 0);
  private roleSubject = new BehaviorSubject<string>(this.getFromSessionStorage(this.roleKey) || '');

  // Observables que los componentes pueden suscribirse
  public token = this.tokenSubject.asObservable();
  public userId = this.userIdSubject.asObservable();
  public role = this.roleSubject.asObservable();

  constructor() { }

  // Métodos para actualizar los valores
  public setToken(token: string): void {
    this.tokenSubject.next(token);
    this.setToSessionStorage(this.tokenKey, token);
  }

  public setUserId(userId: number): void {
    this.userIdSubject.next(userId);
    this.setToSessionStorage(this.userIdKey, userId.toString());
  }

  public setRole(role: string): void {
    this.roleSubject.next(role);
    this.setToSessionStorage(this.roleKey, role);
  }

  private getFromSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  private setToSessionStorage(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  private removeFromSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }



  public logout(): void {
    this.setRole('');
    this.setToken('');
    this.setUserId(0);
    this.removeFromSessionStorage(this.tokenKey);
    this.removeFromSessionStorage(this.userIdKey);
    this.removeFromSessionStorage(this.roleKey);
  }



}
