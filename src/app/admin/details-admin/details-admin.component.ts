import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-details-admin',
  templateUrl: './details-admin.component.html',
  styleUrls: ['./details-admin.component.css']
})
export class DetailsAdminComponent implements OnInit {
  adminForm!: FormGroup;
  submitted = false;
  adminId: string | null = null;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | ArrayBuffer | null = null;
  imgChange = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id');
    this.adminForm = this.fb.group({
      id: [null],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: [true, Validators.required],
      img: [null],
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required],
      phone: ['', Validators.required], 
      description: ['', Validators.required], 
    });

    if (this.adminId !== null) {
      this.displayAdmin(Number(this.adminId));
    }
  }

  displayAdmin(id: number) {
    this.adminService.getAdminById(id).subscribe((res) => {
      this.adminForm.patchValue(res);
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

  saveAdmin() {
    this.submitted = true;
    if (this.adminForm.valid) {
      if (this.adminForm.value.id) {
        this.updateAdmin();
      }
    }
  }

  updateAdmin() {
    if (this.adminForm.valid && this.adminId !== null) {
      const adminIdNumber: number = +this.adminId;
      const formData = new FormData();

      formData.append('username', this.adminForm.get('username')!.value);
      formData.append('email', this.adminForm.get('email')!.value);
      formData.append('status', this.adminForm.get('status')!.value);
      formData.append('firstName', this.adminForm.get('firstName')!.value); 
      formData.append('lastName', this.adminForm.get('lastName')!.value); 
      formData.append('phone', this.adminForm.get('phone')!.value); 
      formData.append('description', this.adminForm.get('description')!.value);
      if (this.imgChange && this.selectedFile) {
        formData.append('img', this.selectedFile);
      }

      this.adminService.updateAdmin(adminIdNumber, formData).subscribe(
        (response) => {
          console.log('Admin updated successfully:', response);
          this.snackBar.open('Admin profile is updated successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error updating admin:', error);
        }
      );
    } else {
      Object.values(this.adminForm.controls).forEach((control) => {
        control.markAsDirty();
      });
    }
  }
}
