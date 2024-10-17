import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoRequest } from '../../../models/video-request';
import { VideoRequestService } from '../../../services/video-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-requests-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-requests-list.component.html',
  styleUrl: './video-requests-list.component.css'
})
export class VideoRequestsListComponent implements OnInit {
  videoRequests: VideoRequest[] = [];

  constructor(
    private videoRequestService: VideoRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVideoRequests();
  }

  loadVideoRequests(): void {
    this.videoRequestService.getAll().subscribe(
      (requests) => {
        this.videoRequests = requests;
      },
      (error) => {
        console.error('Error fetching video requests:', error);
      }
    );
  }

  editRequest(requestId: number): void {
    this.router.navigate(['/admin/technology/requests/edit', requestId]);
  }
}