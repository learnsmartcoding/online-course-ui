import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseCategory } from '../models/category';


@Injectable({providedIn: 'root'})
export class CategoryService {
    private baseUrl = `${environment.apiUrl}/CourseCategory`;//this is the controller base address
    
    constructor(private http: HttpClient) { }

    getCategories(): Observable<CourseCategory[]>{
        return this.http.get<CourseCategory[]>(`${this.baseUrl}`);
    }
    
}