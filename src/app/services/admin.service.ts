import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { ChangePasswordRequest } from '../models/change-password-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient) {}

  getAdmin(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseUrl}/admin`);
  }


  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/admin/${id}`);
  }


  
  updateAdmin(id: number, adminData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/admin/${id}`, adminData);
  }

  updatePassword(id: number , requestPassword : ChangePasswordRequest){
    return this.http.put('http://localhost:8081/api/pfa/admin/password/'+ id,requestPassword);
  }
}
