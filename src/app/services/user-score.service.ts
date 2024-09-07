import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserScore } from '../models/userScore';

@Injectable({
  providedIn: 'root'
})
export class UserScoreService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}

  getAllScores(): Observable<UserScore[]> {
    return this.http.get<UserScore[]>(`${this.baseUrl}/score`);
  }

  deleteScore(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/score/${id}`);
  }
}
