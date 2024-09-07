import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  admin: Admin | null = null;
  image: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.displayAdmin();
  }

  displayAdmin() {
    const adminIdToDisplay = 1; // Specify the admin ID to display
    this.adminService.getAdminById(adminIdToDisplay).subscribe(
      (admin) => {
        admin.processedImg = 'data:image/png;base64,' + admin.byteImg;
        this.admin = admin;
      },
      (error) => {
        console.error('Error fetching admin:', error);
      }
    );
  }
}
