import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/core/nav-bar/nav-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { PlansAndPricingComponent } from "./components/plans-and-pricing/plans-and-pricing.component";
import { ContactUsComponent } from "./components/core/contact-us/contact-us.component";
import { AboutComponent } from "./components/core/about/about.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, 
    HomeComponent, PlansAndPricingComponent, ContactUsComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-course';
}
