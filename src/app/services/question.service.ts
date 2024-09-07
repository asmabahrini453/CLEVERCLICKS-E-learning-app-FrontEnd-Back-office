import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/question`);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/question/${id}`);
  }
 

  addQuestion(questionData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/question`, questionData);
  }

  
  updateQuestion(id: number, questionData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/question/${id}`, questionData);
  }


  
  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/question/${id}`);
  }
  
}
