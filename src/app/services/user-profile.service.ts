import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserReviewModel } from '../models/course';
import { UserModel } from '../models/usermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = `${environment.apiUrl}/UserProfile`;

  constructor(private http: HttpClient) {}

  getUserProfile(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${id}`);
  }
  updateProfile(formData: FormData) {
    return this.http.post(`${this.baseUrl}/updateProfile`, formData);
  }
}

