import { CourseCategory } from './category';

export interface UserRating {
  courseId: number;
  averageRating: number;
  totalRating: number;
}

export interface Course {
  courseId: number;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  courseType: 'Online' | 'Offline';
  seatsAvailable: number | null;
  duration: number; // Duration in hours
  categoryId: number;
  instructorId: number;
  startDate: string | null;
  endDate: string | null;
  category?: CourseCategory;
  userRating?: UserRating;
  sessionDetails?: SessionDetail[];
}

export interface UserReviewModel  {
  reviewId: number;
  courseId: number;
  userId: number;
  userName: string; // Optionally, this can be omitted if not needed in the form
  rating: number;
  comments?: string;
  reviewDate: Date;
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
  instructorUserId: number;
  thumbnail:string;
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
  reviews: UserReviewModel [];
  sessionDetails: SessionDetail[];
}

export interface InstructorModel {
  instructorId: number;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  userId: number;
}
