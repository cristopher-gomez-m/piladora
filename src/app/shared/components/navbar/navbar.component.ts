import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, RoleService } from '../../../core/services/Rol.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    SidebarModule,
    MenuModule,
    TabMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  userRole!: string;
  token!: string;
  constructor(
    private roleService: RoleService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    //this.userRole = this.sessionService.role; // Aquí puedes obtener el rol del usuario desde tu servicio de autenticación
    this.sessionService.token.subscribe(token=>{
      this.token = token;
    })
    this.sessionService.role.subscribe(role=>{
      this.userRole = role;
      this.menuItems = this.roleService.getMenuItemsForRole(this.userRole);
    })
    //this.token = this.sessionService.token;
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
