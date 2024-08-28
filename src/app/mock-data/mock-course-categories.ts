// src/app/mock-data/mock-course-categories.ts

import { CourseCategory } from "../models/category";


export const MOCK_COURSE_CATEGORIES: CourseCategory[] = [
  {
    categoryId: 1,
    categoryName: 'Programming',
    description: 'Courses related to software development and programming languages.'
  },
  {
    categoryId: 2,
    categoryName: 'Data Science',
    description: 'Courses covering data analysis, machine learning, and AI.'
  },
  {
    categoryId: 3,
    categoryName: 'Design',
    description: 'Courses related to graphic design, UX/UI, and creative fields.'
  }
];
