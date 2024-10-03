import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { PlansAndPricingComponent } from './components/plans-and-pricing/plans-and-pricing.component';
import { DataBindingComponent } from './components/basics/data-binding/data-binding.component';
import { DirectivesDemoComponent } from './components/basics/directives-demo/directives-demo.component';
import { BrowseCourseComponent } from './components/course/browse-course/browse-course.component';
import { CourseByCategoryComponent } from './components/course/course-by-category/course-by-category.component';
import { CategoryComponent } from './components/course/category/category.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'course/category', component: CategoryComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'plans-and-price', component: PlansAndPricingComponent },
  { path: 'examples/data-binding', component: DataBindingComponent },
  { path: 'examples/directives', component: DirectivesDemoComponent },
  { path: 'course/category/:categoryId', component: CourseByCategoryComponent },
  {
    path: 'course/session-details/:courseId',
    component: CourseDetailsComponent,
  },
  { path: '**', redirectTo: 'home' },
];
