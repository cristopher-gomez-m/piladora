import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../models/User';
import { UserService } from '../../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-view-user',
  standalone: true,
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  imports: [TableModule,HttpClientModule,ButtonModule,TooltipModule],
  providers: [UserService]
})
export class ViewUserComponent implements OnInit{

  public usuarios: User[] = [];
  constructor(private UserService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  async getUsers(){
    const users = await this.UserService.getAll();
    this.usuarios = users;
  }

}
