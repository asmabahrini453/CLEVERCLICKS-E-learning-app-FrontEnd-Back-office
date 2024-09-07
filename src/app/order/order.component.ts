import { Component, OnInit } from '@angular/core';
import { OrderAdminService } from '../services/order-admin.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit { 
  orderList: Order[] = [];
  constructor(private orderAdminService: OrderAdminService) {}

  ngOnInit(): void {
    this.getAllPlacedOrders();
  }

  getAllPlacedOrders(): void {
    this.orderAdminService.getAllPlacedOrders().subscribe(res => {
      if (res !== null) { 
        this.orderList = res;
        console.log(res);
      }
    });
  }
  

  changeOrderStatus(id: number, orderStatus: string): void {
    this.orderAdminService.changeOrderStatus(id, orderStatus).subscribe(
      () => {
        console.log("Order Status changed successfully");
        this.getAllPlacedOrders(); 
      },
      error => {
        console.error("Error changing order status:", error);
      }
    );
  }
  
}
