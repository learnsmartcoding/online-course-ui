import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseCourseComponent } from '../browse-course/browse-course.component';

@Component({
  selector: 'app-course-by-category',
  standalone: true,
  imports: [BrowseCourseComponent],
  templateUrl: './course-by-category.component.html',
  styleUrl: './course-by-category.component.css'
})
export class CourseByCategoryComponent implements OnInit{
  categoryId: number = 0;
  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.categoryId = Number(params.get('categoryId'));
    })
  }

}
