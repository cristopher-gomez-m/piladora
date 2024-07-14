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

interface Rol {
  name: string;
}


@Component({
  standalone: true,
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  imports: [ButtonModule, DropdownModule, FormsModule, FloatLabelModule, IconFieldModule, InputIconModule, InputNumberModule, InputTextModule, PasswordModule, TableModule, ToolbarModule]

})

export class EditUserComponent {
  value1: string | undefined;
  value2: string | undefined;
  value3: string | undefined;
  value4: string | undefined;
  value5: string | undefined;

  roles: Rol[] | undefined;

    selectedRol: Rol | undefined;

    ngOnInit() {
        this.roles = [
            { name: 'Administrador' },
            { name: 'Operador' }

        ];
    }
    
    validateNumberInput(event: KeyboardEvent) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }
}
