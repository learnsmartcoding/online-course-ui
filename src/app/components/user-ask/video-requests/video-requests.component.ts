import { Component, OnInit } from '@angular/core';
import { mockVideoRequests } from '../../../mock-data/mock-video-requests';
import { VideoRequest } from '../../../models/video-request';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RouterModule } from '@angular/router';
import { VideoRequestService } from '../../../services/video-request.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-video-requests',
  standalone: true,
  imports: [CommonModule, AccordionModule, RouterModule],
  templateUrl: './video-requests.component.html',
  styleUrl: './video-requests.component.css',
})
export class VideoRequestsComponent implements OnInit {
  mockVideoRequests!: VideoRequest[] ;//= mockVideoRequests;

  constructor(private videoRequestService: VideoRequestService, private loginService:LoginService){}

  ngOnInit(): void {
    this.getVideoRequest();
  }
  getVideoRequest() {
    this.videoRequestService.getByUserId(this.loginService.userId).subscribe(s=>{
      this.mockVideoRequests = s;
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'requested':
        return 'requested';
      case 'reviewed':
        return 'reviewed';
      case 'inprocess':
        return 'inprocess';
      case 'completed':
        return 'completed';
      case 'published':
        return 'published';
      default:
        return '';
    }
  }
}
