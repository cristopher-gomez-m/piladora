import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SessionService {
    // Inicializa el BehaviorSubject con el estado inicial
    private tokenSubject = new BehaviorSubject<string>('');
    private userIdSubject = new BehaviorSubject<number>(0);
    private roleSubject = new BehaviorSubject<string>('');
  
    // Observables que los componentes pueden suscribirse
    public token = this.tokenSubject.asObservable();
    public userId = this.userIdSubject.asObservable();
    public role = this.roleSubject.asObservable();
  
    constructor() {}
  
    // Métodos para actualizar los valores
    public setToken(token: string): void {
      this.tokenSubject.next(token);
    }
  
    public setUserId(userId: number): void {
      this.userIdSubject.next(userId);
    }
  
    public setRole(role: string): void {
      this.roleSubject.next(role);
    }

    public logout():void{
        this.setRole('');
        this.setToken('');
        this.setUserId(0);
  }
}
  