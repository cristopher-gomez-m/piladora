import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { SessionService } from '../../../core/services/session.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    PasswordModule,
    MessagesModule,
    ToastModule,

  ],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private sessionService: SessionService,
    private router:Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  async login() {
    try {
      if (this.loginForm.invalid) {
        return;
      }
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log('username', username);
      console.log('password', password);
      const response:any = await this.authService.login(username, password);
      console.log('login exitoso', response);
      this.sessionService.setToken(response.access_token);
      this.sessionService.setUserId(response.user.id);
      this.sessionService.setRole(response.user.role.name);
      if(response.user.role.name == 'administrador'){
        this.router.navigate(['/administrador/home']);
      }
      else{
        this.router.navigate(['/operador/home']);
      }
    } catch (error: any) {
      console.error('error', error);

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.message,
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
