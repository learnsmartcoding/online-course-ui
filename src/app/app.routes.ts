import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/course/category/category.component';
import { CourseByCategoryComponent } from './components/course/course-by-category/course-by-category.component';
import { AboutComponent } from './components/core/about/about.component';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { PlansAndPricingComponent } from './components/plans-and-pricing/plans-and-pricing.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';
import { ViewClaimsComponent } from './components/core/view-claims/view-claims.component';
import { VideoRequestFormComponent } from './components/user-ask/video-request-form/video-request-form.component';
import { VideoRequestsComponent } from './components/user-ask/video-requests/video-requests.component';
import { VideoRequestsListComponent } from './components/user-ask/video-requests-list/video-requests-list.component';
import { canActivateAdminGuard } from './components/core/guards/admin.guard';
import { canActivateGuard } from './components/core/guards/login.guard';
import { CourseComponent } from './components/course/course/course.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { EnrollmentsComponent } from './components/users/enrollments/enrollments.component';
import { UpdateProfileComponent } from './components/users/update-profile/update-profile.component';
import { ViewUserProfileComponent } from './components/users/view-user-profile/view-user-profile.component';
import { BrowseComponent } from './components/course/browse/browse.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { canDeactivateGuard } from './components/core/guards/can-deactivate.guard';
import { courseResolver } from './resolvers/course-detail.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent ,  data: { animation: 'HomePage' }},
  { path: 'course/category', component: CategoryComponent },
  { path: 'course/browse', component: BrowseComponent },
  { path: 'course/category/:categoryId', component: CourseByCategoryComponent },
  {
    path: 'course/session-details/:courseId',
    component: CourseDetailsComponent,
    resolve : {
      courseDetails: courseResolver
    }
  },
  {
    path: 'course/create',
    component: CourseComponent,
    //canActivate: [canActivateAdminGuard],
  },
  { path: 'course/list', component: CourseListComponent },
  {
    path: 'course/edit/:courseId',
    component: CourseComponent,
    //canActivate: [canActivateAdminGuard],
  },
  {
    path: 'about-us',
    data: { animation: 'AboutPage' },
    loadComponent: () =>
      import('./components/core/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./components/core/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      ),
  },

  {
    path: 'plans-and-price',
    loadComponent: () =>
      import('./components/plans-and-pricing/plans-and-pricing.component').then(
        (m) => m.PlansAndPricingComponent
      ),
  },
  { path: 'claims', component: ViewClaimsComponent },
  {
    path: 'technology/request/video',
    component: VideoRequestFormComponent,
    canActivate: [canActivateGuard],
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: 'technology/requests',
    component: VideoRequestsComponent,
    //canActivate: [canActivateGuard],
  },
  {
    path: 'admin/technology/requests',
    component: VideoRequestsListComponent,
    //canActivate: [canActivateAdminGuard],
  },
  {
    path: 'admin/technology/requests/edit/:id',
    component: VideoRequestFormComponent,
    //canActivate: [canActivateAdminGuard],
  },
  { path: 'course/enrollments', component: EnrollmentsComponent },
  { path: 'user/update-profile', component: UpdateProfileComponent },
  { path: 'user/instructors', component: ViewUserProfileComponent },
  {
    path: 'user/chat',
    loadComponent: () =>
      import('./components/chat/chat/chat.component').then(
        (m) => m.ChatComponent
      ),
    canActivate: [canActivateGuard],
  },
  { path: '**', redirectTo: 'home' },
];
