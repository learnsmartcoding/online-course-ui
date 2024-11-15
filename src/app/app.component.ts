import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/core/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { PlansAndPricingComponent } from './components/plans-and-pricing/plans-and-pricing.component';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { AboutComponent } from './components/core/about/about.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { LoginService } from './services/login.service';
import { trigger, transition, style, query, group, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxSpinnerComponent,
    NavBarComponent,
    HomeComponent,
    PlansAndPricingComponent,
    ContactUsComponent,
    AboutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateX(100%)' }),
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'online-course';
  isIframe = false;
  constructor() {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;// && outlet.activatedRouteData['animation'];
  }
}
