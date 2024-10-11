import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserReviewModel } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
    private baseUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) { }

  submitReview(review: UserReviewModel): Observable<UserReviewModel> {
    return this.http.post<UserReviewModel>(`${this.baseUrl}`, review);
  }
}
