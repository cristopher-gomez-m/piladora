import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel'
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from '../../../core/models/User';
import { Role } from '../../../core/models/Role';
import { UserService } from '../../../core/services/user.service';
import { HttpClientModule } from '@angular/common/http';

interface Rol {
  name: string;
}


@Component({
  standalone: true,
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [ButtonModule, HttpClientModule, DropdownModule, FormsModule, FloatLabelModule, IconFieldModule, InputIconModule, InputNumberModule, InputTextModule, PasswordModule, TableModule, ToolbarModule],
  providers: [UserService]
})
export class AddUserComponent {
  // value1: string | undefined;
  // value2: string | undefined;
  // value3: string | undefined;
  // value4: string | undefined;
  // value5: string | undefined;

  // roles: Rol[] | undefined;

  //   selectedRol: Rol | undefined;

  //   ngOnInit() {
  //       this.roles = [
  //           { name: 'Administrador' },
  //           { name: 'Operador' }

  //       ];
  //   }
    
  //   validateNumberInput(event: KeyboardEvent) {
  //     const charCode = (event.which) ? event.which : event.keyCode;
  //     if (charCode < 48 || charCode > 57) {
  //       event.preventDefault();
  //     }
  //   }
  user: User = new User();
  roles: Role[] = [];
  selectedRol: Role | undefined;

  constructor(private userService: UserService) {}

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
      this.user.role = this.selectedRol!;
      const response = await this.userService.register(this.user);
      console.log('User registered successfully', response);
      // Reset form or navigate to another page
    } catch (error) {
      console.error('Error registering user', error);
    }
  }
}
