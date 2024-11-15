import { CommonModule, formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../services/contact.service';
import { LoginService } from '../../../services/login.service';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  userId=0;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastrService: ToastrService,
    private loginService: LoginService,
    private userService:UserProfileService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this. triggerError();
    this.userId = this.loginService.userId;
  }

  triggerError() {
    // Simulate a non-HTTP error
    throw new Error('This is a simulated error');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.value).subscribe(
        (response) => {
          this.toastrService.success('Message sent successfully!');
          this.contactForm.reset(); // Reset form after submission
        },
        (error) => {
          this.toastrService.error('Error sending message. Please try again.');
        }
      );
    }
  }
}