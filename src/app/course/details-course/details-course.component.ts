import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category.service';
import { CourseService } from 'src/app/services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: [
    './details-course.component.css',
    '../../../assets/assets/css/light-bootstrap-dashboard.css',
    '../../../assets/assets/css/bootstrap.min.css',
    '../../../assets/assets/css/demo.css',
  ],
})
export class DetailsCourseComponent implements OnInit {
  courseForm!: FormGroup;
  submitted = false;
  courseId: string | null = null;
  categoryList: Category[] = [];
  isNewCourse: boolean = false;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | ArrayBuffer | null = null;
  imgChange = false;

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {

    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId !== null ) {
      this.displayCategory();
      this.displayCourse(Number(this.courseId));
      
      this.courseForm = this.fb.group({
        id: [null],
        title: ['', Validators.required],
        description: ['', Validators.required],
        rate: ['', Validators.required],
        price: ['', Validators.required],
        status: [true, Validators.required],
        categoryId: [null, Validators.required],
        img: [null],
      });


    }
    
  }

  displayCategory() {
    this.categoryService.getCategory().subscribe((res) => {
      this.categoryList = res;
    });
  }

  displayCourse(id: number) {
    this.courseService.getCourseById(id).subscribe((res) => {
      this.courseForm.patchValue(res);
      this.existingImage = 'data:image/png;base64,' + res.byteImg;
      this.courseForm.controls['category'].setValue(res.category!.id);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChange = true;
    this.existingImage = null;
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveCourse() {
    console.log(this.courseForm.value);
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      if (this.courseForm.value.id) {
        this.updateCourse();
        console.log(this.courseForm.value);
      } else {
        this.addCourse();
        console.log(this.courseForm.value);
      }
    }else{
      this.snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'] 
      });
    }
  }
  updateCourse() {
    if (this.courseForm.valid && this.courseId !== null) {
      const courseIdNumber: number = +this.courseId;
      const formData = new FormData();

      formData.append('title', this.courseForm.get('title')!.value);
      formData.append('description', this.courseForm.get('description')!.value);
      formData.append('rate', this.courseForm.get('rate')!.value);
      formData.append('price', this.courseForm.get('price')!.value);
      formData.append('status', this.courseForm.get('status')!.value);
      formData.append('categoryId', this.courseForm.get('categoryId')!.value);
      formData.append('adminId', '1');
      if (this.imgChange && this.selectedFile) {
        formData.append('img', this.selectedFile);
      }
      console.log('FormData:', formData);
      this.courseService.updateCourse(courseIdNumber, formData).subscribe(
        (response) => {
          console.log('Course updated successfully:', response);
          this.snackBar.open('Course updated successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/course']);
        },
        (error) => {
          console.error('Error updating course:', error);
        }
      );
    } else {
      Object.values(this.courseForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }

  addCourse() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const formData = new FormData();
      formData.append('title', this.courseForm.get('title')!.value);
      formData.append('description', this.courseForm.get('description')!.value);
      formData.append('rate', this.courseForm.get('rate')!.value);
      formData.append('price', this.courseForm.get('price')!.value);
      formData.append('status', this.courseForm.get('status')!.value);
      formData.append('categoryId', this.courseForm.get('categoryId')!.value);
      formData.append('imageFile', this.selectedFile!);
      formData.append('adminId', '1');
      this.courseService.addCourse(formData).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          this.snackBar.open('Course created successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/course']);
        },
        (error) => {
          console.error('Error adding course:', error);

        }
      );
    } else {
      Object.values(this.courseForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }

  
}
