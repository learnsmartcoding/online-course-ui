import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MOCK_COURSES } from '../../../mock-data/mock-courses';
import { Course } from '../../../models/course';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './browse-course.component.html',
  styleUrl: './browse-course.component.css',
})
export class BrowseCourseComponent implements OnInit, OnChanges {
  constructor(private courseService: CourseService) {}
  courses: Course[] = [];
  @Input() categoryId: number = 0;

  ngOnInit(): void {
    //this.courses = MOCK_COURSES.filter(f=>f.categoryId===this.categoryId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.courses = MOCK_COURSES.filter(f=>f.categoryId===this.categoryId);
    this.getCourses(this.categoryId);
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  getCourses(categoryId: number) {
    this.courseService.getCoursesByCategoryId(categoryId).subscribe((data) => {
      this.courses = data;
    });
  }
}
