import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, RoleService } from '../../../core/services/Rol.service';
import { TabMenuModule } from 'primeng/tabmenu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, SidebarModule, MenuModule, TabMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userRole!: string;

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit() {
    this.userRole = 'administrador'; // Aquí puedes obtener el rol del usuario desde tu servicio de autenticación
    this.menuItems = this.roleService.getMenuItemsForRole(this.userRole);
  }

  logout() {
    // Aquí deberías implementar la lógica para cerrar sesión
    // Por ejemplo, podrías limpiar el almacenamiento local, redirigir al inicio de sesión, etc.
    // Aquí se muestra un ejemplo simple de redirección al inicio de sesión:
    this.router.navigate(['/login']);
  }
}

