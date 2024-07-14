import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-view-user',
  standalone: true,
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  imports: [
    CommonModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    TooltipModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule,
    InputGroupModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
  ],
  providers: [UserService, ConfirmationService, MessageService],
})
export class ViewUserComponent implements OnInit {
  selectedUser: User = new User();
  public usuarios: User[] = [];
  
  
  displayEditDialog: boolean = false;
  public page: number = 1;
  public limit: number = 10;
  public total: number = 0;
  public first: number = 0;
  public searchTerm: string = '';
  constructor(
    private UserService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const qs = `?&limit=${this.limit}&page=${this.page}`;
    await this.getUsers(qs);
  }
  async getUsers(qs: string = '') {
    const response = await this.UserService.getAll(qs);
    response.data.forEach((user: User, index: number) => {
      user.index = index + 1;
    });
    this.usuarios = response.data;
    this.total = response.meta.totalItems;
    console.log(response.meta.totalPages);
  }

  async onPageChange(event: PaginatorState): Promise<void> {
    this.page = event.page! + 1; // Suma 1 porque PrimeNG usa índice base 0
    this.first =event.page!;
    const qs = `?page=${this.page}&limit=${this.limit}&search=${this.searchTerm}`;
    await this.getUsers(qs);
  }

  async delete(event: Event, id: number) {
    //console.log(id);
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro de que desea eliminar este usuario?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      accept: async () => {
        try {
          const response: any = await this.UserService.delete(id);
          console.log(response);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: response.message,
          });
          this.page = 1;
          const qs = `?page=${this.page}&limit=${this.limit}`;
          await this.getUsers(qs);
        } catch (error: any) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      },
    });
  }

  async onSearch() {
    this.page = 1;
    this.first = 0;
    const qs = `?page=${this.page}&limit=${this.limit}&search=${this.searchTerm}`;
    await this.getUsers(qs);
  }

  onAdd() {
    this.router.navigate(['administrador/agregar-usuario']);
  }
  editUser(user: User) {
    console.log('Edit user:', user);  // Log selected user
    this.selectedUser = { ...user }; 
    this.displayEditDialog = true;
  }

  saveUser() {
    this.UserService.updateUser(this.selectedUser).subscribe({
      next: response => {
        // Actualizar el usuario en la lista local
        const index = this.usuarios.findIndex(u => u.id === this.selectedUser.id);
        if (index !== -1) {
          this.usuarios[index] = { ...this.selectedUser };
        }
        // Cerrar el diálogo de edición
        this.displayEditDialog = false;
        // Mostrar mensaje de éxito
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado exitosamente' });
      },
      error: error => {
        // Manejar errores
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el usuario' });
      }
    });
  }
  
}
