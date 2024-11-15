import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VideoRequestsComponent } from '../video-requests/video-requests.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VideoRequestService } from '../../../services/video-request.service';
import { VideoRequest } from '../../../models/video-request';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-video-request-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    VideoRequestsComponent,
    RouterModule,
  ],
  templateUrl: './video-request-form.component.html',
  styleUrl: './video-request-form.component.css',
})
export class VideoRequestFormComponent implements OnInit {
  requestForm!: FormGroup;
  topics = ['Angular', 'Azure Service', 'DevOps', '.NET Core', 'Web API'];
  subTopics: string[] = [];
  userId!: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private videoRequestService: VideoRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.userId;
    this.requestForm = this.fb.group({
      videoRequestId: [0],
      name: [{ value: this.loginService.userName, disabled: true }],
      userId: [this.userId],
      topic: ['', Validators.required],
      subTopic: ['', Validators.required],
      requestStatus: [{ value: 'Requested', disabled: true }],
      shortTitle: ['', Validators.required],
      requestDescription: ['', Validators.required],
      response: [{ value: '', disabled: true }],
      videoUrls: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const requestId = params.get('id');
      if (requestId) {
        this.isEditMode = true;
        this.loadRequestForEdit(+requestId);
      }
    });
  }

  loadRequestForEdit(requestId: number): void {
    this.videoRequestService.getById(requestId).subscribe(
      (request) => {
        this.requestForm.patchValue(request);
        // Enable the requestStatus and response fields
        this.requestForm.controls['requestStatus'].enable();

        this.requestForm.controls['response'].enable();

        // Trigger the subtopic population based on the topic value
        const selectedTopic = request.topic;
        this.subTopics = this.getSubTopics(selectedTopic);
      },
      (error) => {
        console.error('Error fetching video request:', error);
      }
    );
  }

  onTopicChange(event: any): void {
    const selectedTopic = event.target.value;
    this.subTopics = this.getSubTopics(selectedTopic);
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const formValue = this.requestForm.getRawValue();

      const videoRequest: VideoRequest = {
        videoRequestId: formValue.videoRequestId,
        userId: this.userId,
        userName: formValue.name,
        topic: formValue.topic,
        subTopic: formValue.subTopic,
        requestStatus: formValue.requestStatus,
        shortTitle: formValue.shortTitle,
        requestDescription: formValue.requestDescription,
        response: formValue.response,
        videoUrls: formValue.videoUrls,
      };

      if (this.isEditMode) {
        // Update existing video request
        this.videoRequestService
          .update(videoRequest.videoRequestId, videoRequest)
          .subscribe({
            next: (response) => {
              console.log('Video request updated successfully:', response);
              this.router.navigate(['/admin/technology/requests']);
            },
            error: (error) => {
              console.error('Error updating video request:', error);
            },
          });
      } else {
        // Create new video request
        this.videoRequestService.create(videoRequest).subscribe({
          next: (response) => {
            console.log('Video request created successfully:', response);
            this.router.navigate(['/technology/requests']);
          },
          error: (error) => {
            console.error('Error creating video request:', error);
          },
        });
      }
    }
  }

  canDeactivate(): boolean {
    // Check if form is dirty and not submitted
    if (this.requestForm.dirty) {
      return confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }

  getSubTopics(topic: string): string[] {
    const subTopicMap: { [key: string]: string[] } = {
      Angular: [
        'Forms',
        'Routing',
        'Components',
        'Directives',
        'Services',
        'Pipes',
        'Angular CLI',
        'RxJS',
        'State Management',
        'Lazy Loading',
        'HTTP Client',
        'Angular Material',
        'Others'
      ],
      'Azure Service': [
        'Azure Functions',
        'App Service',
        'Cosmos DB',
        'Storage Accounts',
        'Azure Logic Apps',
        'Azure SQL Database',
        'Azure Kubernetes Service',
        'Azure DevOps',
        'Azure Virtual Machines',
        'Azure Active Directory',
        'Azure Cognitive Services',
        'Azure Blob Storage',
        'Azure Table Storage',
        'Azure Queue Storage',
        'Azure Files',
        'Azure Redis Cache',
        'Azure Application Insights',
        'Azure Monitor',
        'Azure Key Vault',
        'Azure Event Hubs',
        'Azure Service Bus',
        'Azure Event Grid',
        'Azure Stream Analytics',
        'Azure Search',
        'Azure API Management',
        'Azure Automation',
        'Azure Site Recovery',
        'Azure Security Center',
        'Azure Policy',
        'Azure Blueprints',
        'Azure Resource Manager',
        'Azure Traffic Manager',
        'Azure Front Door',
        'Azure App Configuration',
        'Azure Functions Proxies',
        // Compute Solutions
        'Containerized Solutions',
        'Create Container Images',
        'Manage Container Images',
        'Publish Container Images to ACR',
        'Run Containers with ACI',
        'Azure Container Apps',
        'App Service Web Apps',
        'Configure Diagnostics and Logging for App Service',
        'Deploy Code to App Service',
        'Configure TLS for App Service',
        'App Settings in App Service',
        'Implement Autoscaling in App Service',
        'Deployment Slots for App Service',
        'Azure Functions App',
        'Create Azure Functions App',
        'Configure Azure Functions',
        'Function Input Bindings',
        'Function Output Bindings',
        'Function Triggers (Data, Timers, Webhooks)',

        // Azure Storage
        'Azure Cosmos DB',
        'Perform Operations with Cosmos DB SDK',
        'Consistency Levels in Cosmos DB',
        'Change Feed Notifications in Cosmos DB',
        'Azure Blob Storage',
        'Set Metadata in Blob Storage',
        'Data Operations with Blob Storage SDK',
        'Storage Policies and Lifecycle Management',

        // Azure Security
        'User Authentication with Microsoft Identity Platform',
        'Authorization with Microsoft Entra ID',
        'Shared Access Signatures (SAS)',
        'Microsoft Graph Interactions',
        'Secure Configuration Data (App Configuration, Key Vault)',
        'Key Vault Secrets Management',
        'Managed Identities for Resources',

        // Monitoring, Troubleshooting, and Optimization
        'Caching Solutions (Azure Cache for Redis)',
        'Cache Expiration Policies',
        'Application Cache Patterns',
        'Azure CDN Configuration',
        'Application Insights for Monitoring',
        'Metrics and Logs Analysis with Application Insights',
        'Web Tests and Alerts in Application Insights',

        // Connect to and Consume Services
        'API Management Setup',
        'Create and Document APIs',
        'API Access Configuration',
        'API Management Policies',
        'Event Grid Solutions',
        'Event Hub Solutions',
        'Service Bus Solutions',
        'Azure Queue Storage Solutions',
        'Others'
      ],
      DevOps: [
        'CI/CD Pipelines',
        'Kubernetes Integration',
        'Docker Containerization',
        'Terraform Infrastructure Management',
        'Ansible for Configuration Management',
        'GitOps Practices',
        'Monitoring & Logging Tools',
        'Infrastructure as Code (IaC)',
        'Automated Testing Strategies',
        'Release Management Processes',
        'Configuration Management Tools',
        'Build Automation Techniques',
        'Others'
      ],
      '.NET Core': [
        'Entity Framework Core',
        'Middleware Components',
        'Dependency Injection Patterns',
        'Web API Development',
        'ASP.NET Core MVC Features',
        'SignalR for Real-Time Communication',
        'Application Configuration',
        'Logging Frameworks',
        'Authentication and Authorization',
        'Globalization and Localization',
        'Unit Testing Practices',
        'Performance Optimization Strategies',
        'Others'
      ],
      'Web API': [
        'API Authentication Techniques',
        'API Versioning Strategies',
        'Swagger Documentation for APIs',
        'Error Handling in APIs',
        'API Rate Limiting Techniques',
        'Pagination in APIs',
        'Caching Mechanisms for APIs',
        'API Security Best Practices',
        'RESTful API Principles',
        'GraphQL API Development',
        'OAuth2 Integration',
        'API Gateway Usage',
        'API Documentation and Tools',
        'Others'
      ],
    };
    return subTopicMap[topic] || [];
  }
}
