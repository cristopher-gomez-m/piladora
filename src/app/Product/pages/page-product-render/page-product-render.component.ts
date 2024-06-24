import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from '../../components/list-product/list-product.component';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-page-product-render',
  templateUrl: './page-product-render.component.html',
  standalone: true,
  imports: [CommonModule, ListProductComponent, TableComponent],
  styleUrls: ['./page-product-render.component.css']
})
export default class PageProductRenderComponent { }
