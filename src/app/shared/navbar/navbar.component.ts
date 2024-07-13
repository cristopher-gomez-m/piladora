import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, RoleService } from '../../core/services/RoleService';
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

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    const userRole = 'administrador'; // Aquí puedes obtener el rol del usuario desde tu servicio de autenticación
    this.menuItems = this.roleService.getMenuItemsForRole(userRole);
  }
}

