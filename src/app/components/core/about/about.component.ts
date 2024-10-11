import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModel } from '../../../models/usermodel';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  @Input() userId = 25;

  user: UserModel = {
    userId: 0,
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    adObjId: '',
    profilePictureUrl: '',
    bio: ''
  };

  constructor(private userService: UserProfileService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    // Fetch user data, for now using static values for demo
    this.userService.getUserProfile(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      },
    });
  }

}
