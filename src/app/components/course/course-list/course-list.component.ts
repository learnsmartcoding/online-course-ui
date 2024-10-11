import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../../models/course';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null; // Preview URL
  selectedCourseId!: number;
  modalRef!: BsModalRef;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private modalService: BsModalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses', err);
      },
    });
  }

  viewCourse(courseId: number) {
    this.router.navigate([`/course/session-details/${courseId}`]);
  }

  editCourse(courseId: number) {
    this.router.navigate([`/course/edit/${courseId}`]);
  }

  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.getAllCourses(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting course', err);
        },
      });
    }
  }

  openModal(courseId: number, template: TemplateRef<any>) {
    this.selectedCourseId = courseId;
    this.modalRef = this.modalService.show(template);
    this.previewUrl = null; // Clear preview when opening modal
  }

  // Capture the selected file and show preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Show preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Upload thumbnail image to server
  uploadThumbnail() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('courseId', this.selectedCourseId.toString());

      this.courseService.uploadThumbnail(formData).subscribe({
        next: () => {
          this.toastrService.success('Thumbnail uploaded successfully');
          this.getAllCourses(); // Refresh the list with the new thumbnail
          this.modalRef.hide(); // Close the modal after upload
        },
        error: (err) => {
          this.toastrService.error('Error uploading thumbnail', err);
        },
      });
    }
  }
}
