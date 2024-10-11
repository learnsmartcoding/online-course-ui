import { Component, Input, OnInit } from '@angular/core';
import { CourseCategory } from '../../../models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MOCK_COURSE_CATEGORIES } from '../../../mock-data/mock-course-categories';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TabsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  @Input() categories: CourseCategory[] = [];
  @Input() viewType: 'tabs' | 'list' = 'list';

  constructor(private categoryService:CategoryService) {}

  ngOnInit(): void {
    //this.categories = MOCK_COURSE_CATEGORIES;
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(s=>{
      this.categories = s;
    });
  }
}
