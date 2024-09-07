import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback`);
  }
  deleteFeedback(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/feedback/${id}`);
  }

}
