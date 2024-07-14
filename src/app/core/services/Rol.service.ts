import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getMenuItemsForRole(role: string): MenuItem[] {
    let menuItems: MenuItem[];

    switch (role) {
      case 'administrador':
        menuItems = [
          { label: 'Dashboard', icon: 'pi pi-home', route: '/administrador/home'},
          { label: 'Usuarios', icon: 'pi pi-users', route: '/administrador/usuarios' },
          { label: 'Producto', icon: 'pi pi-user', route: '/administrador/productos' }
        ];
        break;
      case 'operador':
        menuItems = [
          { label: 'Dashboard', icon: 'pi pi-home', route: '/operador/home'},
          { label: 'Producto', icon: 'pi pi-user', route: '/operador/productos' }
        ];
        break;
      default:
        menuItems = [];
        break;
    }

    // Establecer el primer ítem como activo por defecto
    if (menuItems.length > 0) {
      menuItems[0].active = true;
    }

    return menuItems;
  }
}

export interface MenuItem {
  name?: string;
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}
