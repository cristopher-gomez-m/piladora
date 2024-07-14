import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,ImageModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
