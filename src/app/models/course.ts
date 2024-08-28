import { CourseCategory } from "./category";

  
  export interface UserRating {
    courseId: number;
    averageRating: number;
    totalRating: number;
  }
  
  export interface Course {
    courseId: number;
    title: string;
    description: string;
    price: number;
    courseType: 'Online' | 'Offline';
    seatsAvailable: number | null;
    duration: number; // Duration in hours
    categoryId: number;
    instructorId: number;
    startDate: string | null;
    endDate: string | null;
    category: CourseCategory;
    userRating: UserRating;
  }
  


  export interface Review {
    courseId: number;
    userName: string;
    rating: number;
    comments: string;
    reviewDate: string;
  }
  
  export interface SessionDetail {
    sessionId: number;
    courseId: number;
    title: string;
    description: string;
    videoUrl: string;
    videoOrder: number;
  }
  
  export interface CourseDetails {
    courseId: number;
    title: string;
    description: string;
    price: number;
    courseType: string;
    seatsAvailable: number | null;
    duration: number;
    categoryId: number;
    instructorId: number;
    startDate: string;
    endDate: string;
    category: {
      categoryId: number;
      categoryName: string;
      description: string;
    };
    userRating: {
      courseId: number;
      averageRating: number;
      totalRating: number;
    };
    reviews: Review[];
    sessionDetails: SessionDetail[];
  }
  