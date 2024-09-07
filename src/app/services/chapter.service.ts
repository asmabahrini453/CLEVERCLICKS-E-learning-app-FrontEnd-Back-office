import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter } from '../models/chapter';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}

  getChapter(): Observable<Chapter[]> {
    return this.http.get<Chapter[]>(`${this.baseUrl}/chapter`);
  }
  changeStatus(id: number , status:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/chapter/${id}/${status}`);
  }
  getChapterById(id: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.baseUrl}/chapter/${id}`);
  }

  addChapter(chapterData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chapter`, chapterData);
  }
  
  
  updateChapter(id: number, chapterData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/chapter/${id}`, chapterData);
  }

  
  deleteChapter(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/chapter/${id}`);
  }

}
