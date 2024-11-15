import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course, InstructorModel } from '../../../models/course';
import { CategoryService } from '../../../services/category.service';
import { CourseCategory } from '../../../models/category';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  courseForm!: FormGroup;
  sessionCollapsed: boolean[] = [];
  categories: CourseCategory[] = []; // populated from the API
  instructors: InstructorModel[] = [];
  isEditMode: boolean = false;
  courseId!: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch categories from API
    this.loadCategories();
    this.loadInstructors();

    // Check if courseId is present in the route (for editing)
    this.route.params.subscribe((params) => {
      this.courseId = +params['courseId']; // Get courseId from route
      this.isEditMode = !!this.courseId; // Set edit mode flag
      this.initializeForm(); // Initialize the form based on the mode
      if (this.isEditMode) {
        this.loadCourseData(this.courseId); // Load existing course data for editing
      }
    });
  }
  
  initializeForm() {
    this.courseForm = this.fb.group({
      courseId: [0],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      courseType: ['Offline', Validators.required],
      seatsAvailable: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      duration: [0.5, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      instructorId: [0, [Validators.required]],
      startDate: ['2024-01-01', Validators.required], // Set start date
      endDate: ['2026-01-01', Validators.required], // Set end date
      sessionDetails: this.fb.array([]),
    });
  }

  loadCourseData(courseId: number) {
    this.courseService.getCourseDetails(courseId).subscribe((course) => {
      // Convert the startDate and endDate to the proper format
      const formattedStartDate = this.formatDate(course.startDate);
      const formattedEndDate = this.formatDate(course.endDate);

      // Patch the form with the course data
      this.courseForm.patchValue({
        ...course,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sessionDetails: [], // Keep session details empty initially
      });

      // Clear existing sessions and populate the new ones
      this.sessionDetails.clear();
      course.sessionDetails.forEach((session: any) => {
        this.sessionDetails.push(this.fb.group(session));
        this.sessionCollapsed.push(false); // Initially expand the session
      });
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    // Convert the date to 'YYYY-MM-DD' format
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  loadCategories() {
    // Call the API to get the category list
    this.categoryService
      .getCategories()
      .subscribe((s) => (this.categories = s));
  }

  loadInstructors() {
    // Call the API to get the category list
    this.courseService.getInstructors().subscribe((s) => {
      this.instructors = s;
      // Check if instructors array is not empty
      if (this.instructors && this.instructors.length > 0) {
        // Patch the form with the first instructor's id
        this.courseForm.patchValue({
          instructorId: this.instructors[0].instructorId,
        });
      }
      //this.courseForm.instructorId.patch
      //select the first one and patch the instructor id
    });
  }

  // Getter for sessionDetails FormArray
  get sessionDetails(): FormArray {
    return this.courseForm.get('sessionDetails') as FormArray;
  }

  // Create a new FormGroup for a session detail
  newSession(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]],
      videoUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?(www.)?(youtube|vimeo|example)+.[a-z]{2,3}/.+'
          ),
        ],
      ], // Example URL validation
      videoOrder: [0, [Validators.required, Validators.min(1)]],
    });
  }

  // Add a new session to the FormArray
  addSession() {
    this.sessionDetails.push(this.newSession());
    this.sessionCollapsed.push(false); // Initially, the session is expanded
  }

  // Remove a session from the FormArray
  removeSession(index: number) {
    this.sessionDetails.removeAt(index);
    this.sessionCollapsed.splice(index, 1); // Remove collapse status
  }

  // Toggle session collapse
  toggleCollapse(index: number) {
    this.sessionCollapsed[index] = !this.sessionCollapsed[index];
  }
  viewCourses() {
    this.router.navigate([`/course/list`]);
  }
  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;

      if (this.isEditMode) {
        // If editing, update the existing course
        this.courseService
          .updateCourse(this.courseId, formData)
          .subscribe((response) => {
            console.log('Course updated successfully:', response);
            this.viewCourses();
          });
      } else {
        // If creating, create a new course
        this.courseService.createCourse(formData).subscribe((response) => {
          console.log('Course created successfully:', response);
          this.courseForm.reset();
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
