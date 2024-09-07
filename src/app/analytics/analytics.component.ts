import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from '../services/order-admin.service';
import { AnalyticsResponse } from '../models/AnalyticsResponse'; 

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  analyticsData: AnalyticsResponse | undefined;

  constructor(private orderAdminService: OrderAdminService) {}

  ngOnInit(): void {
    this.orderAdminService.getAnalytics().subscribe((res: AnalyticsResponse) => {
      console.log(res);
      this.analyticsData = res;
    });
  }
}
