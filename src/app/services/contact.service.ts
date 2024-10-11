import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
    private baseUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  sendMessage(contactData: any): Observable<any> {
    return this.http.post(this.baseUrl, contactData);
  }
}
