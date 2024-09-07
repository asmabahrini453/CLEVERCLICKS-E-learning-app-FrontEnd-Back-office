import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }
  changeStatus(id: number , status:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${id}/${status}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${id}`);
  }
  getCategoryByName(name : any): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/search/${name}`);
  }

  addCategory(categoryData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/category`, categoryData);
  }

  
  updateCategory(id: number, categoryData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/category/${id}`, categoryData);
  }


  
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/category/${id}`);
  }
}
