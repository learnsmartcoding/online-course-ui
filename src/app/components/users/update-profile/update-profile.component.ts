import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserProfileService } from '../../../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  selectedFile!: File;
  previewUrl: string | ArrayBuffer | null = null;
  isInstructor = false;
  userProfileId = 0;

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private router:Router
  ) {
    // Initialize form with bio control, conditionally required
    this.profileForm = this.fb.group({
      bio: [{ value: '', disabled: true }],
    });
  }

  ngOnInit(): void {
    if(!this.loginService.isLoggedIn){
      this.router.navigateByUrl('/home');
      return;
    }
    this.userProfileId = this.loginService.userId; // Assuming user ID is from loginService
    this.isInstructor =
      this.loginService.userRoles.filter((f) => f == 'Instructor').length > 0;

    if (this.isInstructor) {
      this.profileForm.get('bio')?.enable(); // Enable bio if instructor
    } else {
      this.profileForm.get('bio')?.clearValidators(); // Clear bio validators if not instructor
      this.profileForm.get('bio')?.updateValueAndValidity();
    }

    // Fetch user profile data on component load
    this.userProfileService.getUserProfile(this.userProfileId).subscribe(
      (response) => {
        this.profileForm.patchValue({
          bio: response.bio || '', // Pre-fill bio if available
        });
        if (response.profilePictureUrl) {
          this.previewUrl = response.profilePictureUrl;
        }
      },
      (error) => {
        this.toastrService.error('Error fetching user profile');
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Preview the image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('bio', this.profileForm.get('bio')?.value);
    formData.append('userId', this.loginService.userId.toString());
    formData.append('picture', this.selectedFile);

    this.userProfileService.updateProfile(formData).subscribe(
      (response) => {
        this.toastrService.success('Profile updated successfully');
      },
      (error) => {
        this.toastrService.error('Error updating profile');
      }
    );
    if (this.profileForm.valid) {
  
    }
  }
}
