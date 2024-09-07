import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];
  allCategories: Category[] = [];
  filteredCategories: Category[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;
  searchCategoryForm!: FormGroup;
  pages: number[] = [];
  noCategoryFound: boolean = false;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.retrieveAllCategories();
    this.searchCategoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  retrieveAllCategories() {
    this.categoryService.getCategory().subscribe(res => {
      this.allCategories = res.map(category => ({
        ...category,
        processedImg: 'data:image/png;base64,' + category.byteImg
      }));
      this.filteredCategories = this.allCategories;
      this.calculateTotalPages(this.filteredCategories);
    });
  }

  calculateTotalPages(categories: Category[]) {
    this.totalPages = Math.ceil(categories.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateCategoryList();
  }

  updateCategoryList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.categoryList = this.filteredCategories.slice(start, end).map(category => ({
      ...category,
      processedImg: 'data:image/png;base64,' + category.byteImg
    }));
  }

  submitForm() {
    if (!this.searchCategoryForm.valid) {
      return;
    }
    const name = this.searchCategoryForm.get('name')!.value.toLowerCase();
    this.filteredCategories = this.allCategories.filter(category =>
      category.name && category.name.toLowerCase().includes(name)
    ).map(category => ({
      ...category,
      processedImg: 'data:image/png;base64,' + category.byteImg
    }));
    this.currentPage = 1;
    if (this.filteredCategories.length === 0) {
      this.noCategoryFound = true;
      this.categoryList = [];
    } else {
      this.noCategoryFound = false;
      this.calculateTotalPages(this.filteredCategories);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCategoryList();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCategoryList();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateCategoryList();
  }

  resetCategoryList() {
    this.currentPage = 1;
    this.noCategoryFound = false;
    this.retrieveAllCategories();
  }
  
  changeStatus(id: number | undefined, newStatus: string): void {
    if (id === undefined) {
      console.error("Category ID is undefined");
      return;
    }
    this.categoryService.changeStatus(id, newStatus).subscribe(
      () => {
        console.log("Category status changed successfully");
        const index = this.categoryList.findIndex(category => category.id === id);
        if (index !== -1) {
          // Update the status of the category
          this.categoryList[index].status = newStatus;
          // Create a new array for the categories to trigger change detection
          this.categoryList = [...this.categoryList];
        }
      },
      error => {
        console.error("Error changing category status:", error);
      }
    );
  }
  
  

  
}
