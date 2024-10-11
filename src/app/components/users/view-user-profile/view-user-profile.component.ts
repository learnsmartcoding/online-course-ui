import { Component, Input, input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/usermodel';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-view-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-user-profile.component.html',
  styleUrl: './view-user-profile.component.css',
})
export class ViewUserProfileComponent implements OnInit {
  @Input() userId = 25;

  user: UserModel = {
    userId: 0,
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    adObjId: '',
    profilePictureUrl: '',
    bio: '',
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
        this.user.bio = this.user.bio?.replace(/\n/g, '<br>');
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      },
    });
  }
}
