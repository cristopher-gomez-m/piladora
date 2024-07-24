import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { Role } from '../../../core/models/Role';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [
    ButtonModule, HttpClientModule, DropdownModule, FormsModule, FloatLabelModule, InputTextModule, PasswordModule
  ],
  providers: [UserService]
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  roles: Role[] = [];
  selectedRole: Role | undefined;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.roles = [
      new Role(1, 'Administrador'),
      new Role(2, 'Operador')
    ];
  }

  validateNumberInput(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  async onSubmit() {
    try {
      if (this.selectedRole) {
        this.user.role = this.selectedRole.name.toLowerCase(); // Convert role name to lowercase as expected by the API
        const response = await this.userService.register(this.user);
        console.log('User registered successfully', response);
        this.resetForm();
        this.router.navigate(['/administrador/usuarios']);
      } else {
        console.error('Role is not selected');
      }
    } catch (error) {
      console.error('Error registering user', error);
    }
  }

  resetForm() {
    this.user = new User();
    this.selectedRole = undefined;
  }
}
