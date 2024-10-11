import { Component } from '@angular/core';
import { CarouselComponent, CarouselModule } from 'ngx-bootstrap/carousel';
import { PlansAndPricingComponent } from '../plans-and-pricing/plans-and-pricing.component';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from "../course/category/category.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, PlansAndPricingComponent, CommonModule, CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  slides = [
    { src: '../../../assets/skills/5.png', alt: 'First slide' },
    { src: '../../../assets/skills/1.png', alt: 'Second slide' },
    { src: '../../../assets/skills/2.png', alt: 'Third slide' },
    { src: '../../../assets/skills/3.png', alt: 'Fourth slide' },
    { src: '../../../assets/skills/4.png', alt: 'Fifth slide' }
  ];
}
