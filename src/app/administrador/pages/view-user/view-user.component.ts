import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-view-user',
  standalone: true,
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  imports: [TableModule,HttpClientModule,ButtonModule,TooltipModule,PaginatorModule],
  providers: [UserService]
})
export class ViewUserComponent implements OnInit{

  public usuarios: User[] = [];
  public page: number = 1;
  public limit: number = 2;
  public total: number = 0;
  constructor(private UserService:UserService) { 

  }

  async ngOnInit(): Promise<void> {
    const qs = `?&limit=${this.limit}&page=${this.page}`;
    await this.getUsers(qs);
  }
  async getUsers(qs:string=''){
    const response = await this.UserService.getAll(qs);
    response.data.forEach((user:User,index:number)=>{
      user.index = index+1;
    })
    this.usuarios = response.data;
    this.total = response.meta.totalItems;
    console.log(response.meta.totalPages);
  }

  async onPageChange(event: PaginatorState): Promise<void> {
    this.page = event.page! + 1; // Suma 1 porque PrimeNG usa índice base 0
    const qs = `?page=${this.page}&limit=${this.limit}`;
    await this.getUsers(qs);
  }
}
