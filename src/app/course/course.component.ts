import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courseList: Course[] = [];
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number = 0;
  searchCourseForm!: FormGroup;
  pages: number[] = [];
  noCourseFound: boolean = false;

  constructor(private courseService: CourseService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.retrieveAllCourses();
    this.searchCourseForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  retrieveAllCourses() {
    this.courseService.getCourse().subscribe(res => {
      this.allCourses = res.map(course => ({
        ...course,
        processedImg: 'data:image/png;base64,' + course.byteImg
      }));
      this.filteredCourses = this.allCourses;
      this.calculateTotalPages(this.filteredCourses);
    });
  }

  calculateTotalPages(courses: Course[]) {
    this.totalPages = Math.ceil(courses.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updateCourseList();
  }

  updateCourseList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.courseList = this.filteredCourses.slice(start, end).map(course => ({
      ...course,
      processedImg: 'data:image/png;base64,' + course.byteImg
    }));
  }

  submitForm() {
    if (!this.searchCourseForm.valid) {
      return;
    }
    const title = this.searchCourseForm.get('title')!.value.toLowerCase();
    this.filteredCourses = this.allCourses.filter(course =>
      course.title && course.title.toLowerCase().includes(title)
    ).map(course => ({
      ...course,
      processedImg: 'data:image/png;base64,' + course.byteImg
    }));
    this.currentPage = 1;
    if (this.filteredCourses.length === 0) {
      this.noCourseFound = true;
      this.courseList = [];
    } else {
      this.noCourseFound = false;
      this.calculateTotalPages(this.filteredCourses);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCourseList();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCourseList();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateCourseList();
  }

  resetCourseList() {
    this.currentPage = 1;
    this.noCourseFound = false;
    this.retrieveAllCourses();
  }
  
}
