export interface CoursePaymentModel {
  paymentId: number;
  enrollmentId: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  paymentStatus: string;
}

export interface CourseEnrollmentModel {
  enrollmentId: number;
  courseId: number;
  userId: number;
  courseTitle?: string;
  enrollmentDate: Date;
  paymentStatus: string;
  coursePaymentModel: CoursePaymentModel;
}
