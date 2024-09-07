import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordRequest } from 'src/app/models/change-password-request';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  passForm: FormGroup;
  adminId: string | null = null;
  submitted: boolean = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.passForm = this.fb.group({
      id: [null],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id');
    if (this.adminId !== null) {
      this.displayAdmin(Number(this.adminId));
    }
  }

  displayAdmin(id: number) {
    this.adminService.getAdminById(id).subscribe((res) => {
      console.log(res);
      this.passForm.patchValue(res);
    });
  }

  savePassword() {
    console.log(this.passForm.value);
    this.submitted = true;
    if (this.passForm.valid) {
      if (this.passForm.value.id) {
        this.updatePassword();
      } 
    }
  }

  updatePassword() {
    const newPassword = this.passForm.get('newPassword')?.value;
    if (newPassword) {
      const request: ChangePasswordRequest = {
        newPassword: newPassword,
      };

      this.adminService.updatePassword(Number(this.adminId), request).subscribe(
        (res) => {
          console.log('Password updated successfully:', res);
          this.passForm.get('newPassword')?.reset();
          this.router.navigate(['/admin']);

        },
        (error) => {
          console.error('Failed to update password:', error);
        }
      );
    } else {
      console.error('New password is required.');
    }
  }
}
