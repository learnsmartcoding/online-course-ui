import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseDetails } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MOCK_COURSE_DETAILS } from '../../../mock-data/mock-course-details';
import { SafePipe } from '../../../pipes/safe.pipe';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,FormsModule, SafePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: CourseDetails | null = null;
  videoUrl: string | null = null;
  courseId:number=0;

  constructor(private route: ActivatedRoute,
    private courseService: CourseService,) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.getCourseDetails();
  }

  getCourseDetails(){
    this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
      this.courseDetails = data;
      this.courseDetails.description = this.courseDetails.description.replace(
        /\n/g,
        '<br>'
      );
      this.courseDetails.sessionDetails.forEach((s) => {
        s.description = s.description.replace(/\n/g, '<br>');
      });
    });
  }
  openVideo(videoUrl: string): void {
    const videoId = this.extractVideoId(videoUrl);
    this.videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  closeVideo(): void {
    this.videoUrl = null;
  }

  private extractVideoId(url: string): string {
    const regex = /youtube\.com\/watch\?v=([^"&?/]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
}