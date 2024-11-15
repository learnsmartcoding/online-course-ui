import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserReviewModel } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent implements OnInit {
  @Input() courseId!: number;
  @Input() userId!: number;
  @Output() reviewSubmitted = new EventEmitter<UserReviewModel>();
  isLoggedIn = false;

  reviewForm!: FormGroup;
  maxRating: number = 5; // Maximum rating value
  rating: number = 0; // Initial rating value

  constructor(private fb: FormBuilder,   private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn;
    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      comments: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review: UserReviewModel = {
        reviewId: 0, // New review, so set 0 or let the backend generate it
        courseId: this.courseId,
        userId: this.userId,
        userName: '', // To be populated by backend if needed
        rating: this.reviewForm.value.rating,
        comments: this.reviewForm.value.comments,
        reviewDate: new Date(),
      };

      this.reviewSubmitted.emit(review);
      // Reset the form after submission
      this.reviewForm.reset({
        rating: null, // Reset rating to its default state
        comments: '', // Clear the comments field
      });
    }
  }
}
