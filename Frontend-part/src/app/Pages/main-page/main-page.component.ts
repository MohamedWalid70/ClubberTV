import { Component } from '@angular/core';
import { BodyComponent } from '../../Components/body/body.component';
import { FooterComponent } from '../../Components/footer/footer.component';
// import { NavbarComponent } from '../../Components/navbar/navbar.component';

@Component({
  selector: 'app-main-page',
  imports: [BodyComponent, FooterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
