import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}

  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/course`);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/course/${id}`);
  }

  addCourse(courseData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/course`, courseData);
  }
  
  
  updateCourse(id: number, courseData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/course/${id}`, courseData);
  }

  
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/course/${id}`);
  }

  getCourseByTitle(title : any): Observable<any> {
    return this.http.get(`${this.baseUrl}/course/search/${title}`);
  }
}
