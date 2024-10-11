import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CourseEnrollmentModel } from '../models/enrollment';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
    private baseUrl = `${environment.apiUrl}/enrollment`;

  constructor(private http: HttpClient) {}

  enrollCourse(enrollmentModel: CourseEnrollmentModel): Observable<CourseEnrollmentModel> {
    return this.http.post<CourseEnrollmentModel>(`${this.baseUrl}`, enrollmentModel);
  }

  getEnrollment(id: number): Observable<CourseEnrollmentModel> {
    return this.http.get<CourseEnrollmentModel>(`${this.baseUrl}/${id}`);
  }
  getUserEnrollments(id: number): Observable<CourseEnrollmentModel[]> {
    return this.http.get<CourseEnrollmentModel[]>(`${this.baseUrl}/user/${id}`);
  }
}
