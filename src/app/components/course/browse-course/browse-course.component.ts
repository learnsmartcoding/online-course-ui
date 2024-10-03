import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Course } from '../../../models/course';
import { MOCK_COURSES } from '../../../mock-data/mock-courses';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './browse-course.component.html',
  styleUrl: './browse-course.component.css',
})
export class BrowseCourseComponent implements OnInit, OnChanges {
  courses: Course[] = [];
  @Input() categoryId: number = 0;
  constructor() {
    this.courses = MOCK_COURSES;
  }

  processCourse() {
    this.getCourseByCategory(this.categoryId);
  }

  getCourseByCategory(categoryId: number) {
    this.courses = MOCK_COURSES.filter((f) => f.categoryId == categoryId);
  }

  ngOnInit(): void {
    this.processCourse();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.processCourse();
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}
