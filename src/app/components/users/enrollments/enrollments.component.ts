import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseEnrollmentModel } from '../../../models/enrollment';
import { EnrollmentService } from '../../../services/enrollment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css'
})
export class EnrollmentsComponent implements OnInit {
  enrollments: CourseEnrollmentModel[] = [];
  userId: number = 0;  // Use actual user ID here

  constructor(private enrollmentService: EnrollmentService, private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.userId=this.loginService.userId;
    this.enrollmentService.getUserEnrollments(this.userId).subscribe((data: CourseEnrollmentModel[]) => {
      this.enrollments = data;
    });
  }

  viewCourseDetails(courseId: number): void {
    this.router.navigate([`/course/session-details/${courseId}`]);
  }
}