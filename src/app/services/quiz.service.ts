import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}
  getAllQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quiz`);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/quiz/${id}`);
  }
 

  addQuiz(quizData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/quiz`, quizData);
  }

  
  updateQuiz(id: number, quizData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/quiz/${id}`, quizData);
  }


  
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/quiz/${id}`);
  }
  
}
