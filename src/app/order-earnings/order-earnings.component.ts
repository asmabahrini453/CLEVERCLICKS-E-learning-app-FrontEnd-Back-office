import { Component, OnInit } from '@angular/core';
import { AnalyticsResponse } from 'src/app/models/AnalyticsResponse';
import { OrderAdminService } from 'src/app/services/order-admin.service';

@Component({
  selector: 'app-order-earnings',
  templateUrl: './order-earnings.component.html',
  styleUrls: ['./order-earnings.component.css']
})
export class OrderEarningsComponent implements OnInit {
  analyticsData: AnalyticsResponse | undefined;

  constructor(private orderAdminService: OrderAdminService) {}

  ngOnInit(): void {
    this.orderAdminService.getAnalytics().subscribe((res: AnalyticsResponse) => {
      console.log(res);
      this.analyticsData = res;
    });
  }
}
