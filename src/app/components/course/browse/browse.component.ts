import { Component } from '@angular/core';
import { BrowseCourseComponent } from "../browse-course/browse-course.component";

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [BrowseCourseComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent {

}
