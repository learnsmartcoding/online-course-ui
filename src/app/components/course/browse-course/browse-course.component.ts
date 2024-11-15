import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Course } from '../../../models/course';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, PopoverModule],
  templateUrl: './browse-course.component.html',
  styleUrls: ['./browse-course.component.css'], // Fix typo: styleUrl to styleUrls
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // Start smaller and transparent
        animate(
          '300ms cubic-bezier(0.6, -0.28, 0.735, 0.045)',
          style({ transform: 'scale(1)', opacity: 1 })
        ), // Bounce effect
      ]),
      transition(':leave', [
        animate(
          '200ms ease-out',
          style({ transform: 'scale(0.5)', opacity: 0 })
        ), // Shrink when leaving
      ]),
    ]),
  ],
})
export class BrowseCourseComponent implements OnInit, OnChanges {
  constructor(private courseService: CourseService) {}
  courses: Course[] = [];
  @Input() categoryId: number = 0;
  @Input() browseAllCourse: boolean = false;

  ngOnInit(): void {
    this.processCourse();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.processCourse();
  }

  processCourse() {
    if (this.browseAllCourse) {
      this.getCourses();
    } else {
      this.getCourseByCategory(this.categoryId);
    }
  }
  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  getCourseByCategory(categoryId: number) {
    if (categoryId == 2 || categoryId == 7) {
      categoryId = 345434534534534;
    }

    this.courseService.getCoursesByCategoryId(categoryId).subscribe((data) => {
      this.courses = data;
    });
  }

  getCourses() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }
}
