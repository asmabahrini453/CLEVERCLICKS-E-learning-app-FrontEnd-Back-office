import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {
  baseUrl = 'http://localhost:8081/api/pfa';

  constructor(private http: HttpClient){ }

  getAllPlacedOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/order`);
  }

  changeOrderStatus(id: number , orderStatus:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/order/${id}/${orderStatus}`);
  }

  getAnalytics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/order/analytics`);
  }
}
