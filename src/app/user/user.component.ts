import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserDto } from '../models/UserDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userList: UserDto[] = [];
  allUsers: UserDto[] = [];
  filteredUsers: UserDto[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;
  searchForm!: FormGroup;
  pages: number[] = [];
  noUserFound: boolean = false;

  constructor(private userService: UserService, 
    private fb: FormBuilder ,private router: Router ) {}

  ngOnInit(): void {
    this.retrieveAllUsers();
    this.searchForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  retrieveAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      this.allUsers = res.slice(1).map(user => ({ 
        ...user,
        status: user.status ? 'Active' : 'Inactive'
      })) as UserDto[];
      this.filteredUsers = this.allUsers;
      this.calculateTotalPages(this.filteredUsers);
    });
  }
  
 
  changeStatus(id: number, status: string): void {
    this.userService.changeStatus(id, status).subscribe(
      (updatedUser: UserDto) => {
        console.log("User status changed successfully");
        // Find the user in the userList and update its status
        const index = this.userList.findIndex(user => user.id === id);
        if (index !== -1) {
          this.userList[index].status = status; 
        }
        
      },
      error => {
        console.error("Error changing status:", error);
      }
    );
  }
  

  calculateTotalPages(users: UserDto[]) {
    this.totalPages = Math.ceil(users.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateUserList();
  }

  updateUserList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.userList = this.filteredUsers.slice(start, end).map(user => ({
      ...user,
      processedImg: 'data:image/png;base64,' + user.byteImg
    }));
  }

  submitForm() {
    if (!this.searchForm.valid) {
      return; 
    }
    const name = this.searchForm.get('name')!.value.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user =>
      user.name && user.name.toLowerCase().includes(name)
    );
    this.currentPage = 1; 
    if (this.filteredUsers.length === 0) {
      this.noUserFound = true;
      this.userList = []; 
    } else {
      this.noUserFound = false;
      this.calculateTotalPages(this.filteredUsers);
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateUserList();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateUserList();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateUserList();
  }

  
  resetUserList() {
    this.currentPage = 1;
    this.noUserFound = false;
    this.retrieveAllUsers(); 
  }
  
}
