import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-details-category',
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.css']
})
export class DetailsCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  submitted = false;
  categoryId: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | ArrayBuffer | null = null; 
  imgChange = false;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      img: [null],
    });

    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId !== null) {
      this.displayCategory(Number(this.categoryId));
    }
  }

  displayCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe((res) => {
      this.categoryForm.patchValue(res);
      this.existingImage = 'data:image/png;base64,' + res.byteImg;
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

  saveCategory() {
    this.submitted = true;
    if (this.categoryForm.valid) {
      if (this.categoryForm.value.id) {
        this.updateCategory();
      } else {
        this.addCategory();
      }
    } else {
      this.snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
  }

  updateCategory() {
    if (this.categoryForm.valid && this.categoryId !== null) {
      const categoryIdNumber: number = +this.categoryId;
      const formData = new FormData();

      formData.append('name', this.categoryForm.get('name')!.value);
      formData.append('description', this.categoryForm.get('description')!.value);
      formData.append('status', this.categoryForm.get('status')!.value);
      if (this.imgChange && this.selectedFile) {
        formData.append('img', this.selectedFile);
      }

      this.categoryService.updateCategory(categoryIdNumber, formData).subscribe(
        (response) => {
          this.snackBar.open('Category updated successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/category']);
        },
        (error) => {
          console.error('Error updating Category:', error);
        }
      );
    } else {
      Object.values(this.categoryForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }

  addCategory() {
    this.submitted = true;
    if (this.categoryForm.valid) {
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name')!.value);
      formData.append('description', this.categoryForm.get('description')!.value);
      formData.append('status', this.categoryForm.get('status')!.value);
      formData.append('imageFile', this.selectedFile!);

      this.categoryService.addCategory(formData).subscribe(
        (response) => {
          this.snackBar.open('Category created successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/category']);
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    } else {
      Object.values(this.categoryForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }
}
