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

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, PopoverModule],
  templateUrl: './browse-course.component.html',
  styleUrls: ['./browse-course.component.css'], // Fix typo: styleUrl to styleUrls
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
