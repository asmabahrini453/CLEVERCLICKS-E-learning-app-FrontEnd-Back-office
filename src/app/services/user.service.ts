import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/userScore';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
   baseUrl = 'http://localhost:8081/api/pfa';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }

  getUserByName(name : any): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/search/${name}`);
  }
  changeStatus(id: number , status:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}/${status}`);
  }
}
