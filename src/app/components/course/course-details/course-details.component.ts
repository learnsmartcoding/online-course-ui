import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseDetails, UserReviewModel } from '../../../models/course';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../../../pipes/safe.pipe';
import { CourseService } from '../../../services/course.service';
import { LoginService } from '../../../services/login.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import {
  CourseEnrollmentModel,
  CoursePaymentModel,
} from '../../../models/enrollment';
import { ToastrService } from 'ngx-toastr';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ReviewService } from '../../../services/review.service';
import { RatingComponent, RatingModule } from 'ngx-bootstrap/rating';
import { UserProfileService } from '../../../services/user-profile.service';
import { UserModel } from '../../../models/usermodel';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SafePipe,
    ReviewFormComponent,
    RatingModule,
    RouterModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: CourseDetails | null = null;
  videoUrl: string | null = null;
  courseId!: number;
  activeSessions: Set<number> = new Set<number>(); // Track active sessions for collapsing
  isLoggedIn = false;
  userId = 0;
  instructorInfo!: UserModel;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private loginService: LoginService,
    private enrollmentService: EnrollmentService,
    private toastr: ToastrService,
    private reviewService: ReviewService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    // Access the resolved data via route.data
    this.courseDetails = this.route.snapshot.data['courseDetails'];
    this.courseId = this.courseDetails?.courseId || 0;
    if (!this.courseDetails) {
      // Handle case where data is not found (e.g., show an error)
      console.error('Course details not found, retrying to fetch from API');
      this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
      this.getCourseDetails();
    }

    this.isLoggedIn = this.loginService.isLoggedIn;
    this.userId = this.loginService.userId;
  }

  openVideo(videoUrl: string): void {
    const videoId = this.extractVideoId(videoUrl);
    this.videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  closeVideo(): void {
    this.videoUrl = null;
  }

  toggleSession(session: any): void {
    if (this.activeSessions.has(session.id)) {
      this.activeSessions.delete(session.id);
    } else {
      this.activeSessions.add(session.id);
    }
  }

  private extractVideoId(url: string): string {
    const regex = /youtube\.com\/watch\?v=([^"&?/]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  getCourseDetails() {
    this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
      this.courseDetails = data;
      this.getInstructorInfo(data.instructorUserId);
      this.courseDetails.description = this.courseDetails.description.replace(
        /\n/g,
        '<br>'
      );
      this.courseDetails.sessionDetails.forEach((s) => {
        s.description = s.description.replace(/\n/g, '<br>');
      });
    });
  }

  getInstructorInfo(userId: number) {
    this.userService.getUserProfile(userId).subscribe((s) => {
      this.instructorInfo = s;
    });
  }
  enroll(): void {
    if (!this.isLoggedIn || !this.courseDetails) return;

    const paymentModel: CoursePaymentModel[] = [
      {
        paymentId: 0,
        enrollmentId: 0,
        amount: 0, // Set amount as per your logic
        paymentDate: new Date(),
        paymentMethod: 'Credit Card', // Example; replace with actual payment method
        paymentStatus: 'Pending',
      },
    ];

    const enrollmentModel: CourseEnrollmentModel = {
      enrollmentId: 0,
      courseId: this.courseId,
      userId: this.loginService.userId, // Assume a method to get user ID
      enrollmentDate: new Date(),
      paymentStatus: 'Pending',
      coursePaymentModel: {
        paymentId: 0,
        enrollmentId: 0,
        amount: 0, // Set amount as per your logic
        paymentDate: new Date(),
        paymentMethod: 'Credit Card', // Example; replace with actual payment method
        paymentStatus: 'Pending',
      },
    };

    this.enrollmentService.enrollCourse(enrollmentModel).subscribe({
      next: (response) => {
        console.log('Enrollment successful:', response);
        // Handle successful enrollment (e.g., show a success message)
        this.toastr.success('Enrollment successful!');
      },
      error: (error) => {
        // Handle the error and show an error message using Toastr
        if (error.status === 400) {
          this.toastr.warning(
            'Enrollment failed: This course is already enrolled',
            'Error'
          );
        } else {
          this.toastr.error('Something went wrong. Please try again.', 'Error');
        }
      },
      complete: () => {
        // Optional: Handle any cleanup or final logic after the observable completes
      },
    });
  }

  onReviewSubmitted(review: UserReviewModel): void {
    this.reviewService.submitReview(review).subscribe({
      next: (response) => {
        console.log('Review submitted successfully!');
        this.getCourseDetails();
      },
      error: (error) => {
        this.toastr.warning('Failed to submit review', 'Error');
      },
      complete: () => {
        // Optional: Handle any cleanup or final logic after the observable completes
      },
    });
  }
}
