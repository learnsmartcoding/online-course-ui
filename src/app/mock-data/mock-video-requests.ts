import { VideoRequest } from "../models/video-request";

export const mockVideoRequests: VideoRequest[] = [
  {
    videoRequestId: 1,
    userName: 'John Doe',
    topic: 'Angular',
    subTopic: 'Forms',
    requestStatus: 'completed',
    shortTitle: 'Angular Reactive Forms',
    requestDescription: 'A detailed guide on building reactive forms in Angular.',
    response: 'Video created and published.',
    videoUrls: 'https://www.youtube.com/watch?v=example1',
  },
  {
    videoRequestId: 2,
    userName: 'Jane Smith',
    topic: 'Azure Service',
    subTopic: 'Azure Functions',
    requestStatus: 'inprocess',
    shortTitle: 'Azure Functions Basics',
    requestDescription: 'An introduction to Azure Functions and how to use them.',
    response: 'Video in process.',
  },
  {
    videoRequestId: 3,
    userName: 'Michael Johnson',
    topic: 'DevOps',
    subTopic: 'CI/CD Pipelines',
    requestStatus: 'published',
    shortTitle: 'Setting up CI/CD Pipelines',
    requestDescription: 'A step-by-step guide on setting up CI/CD pipelines with Azure DevOps.',
    response: 'Video published.',
    videoUrls: 'https://www.youtube.com/watch?v=example2',
  },
  {
    videoRequestId: 4,
    userName: 'Emily Davis',
    topic: 'Web API',
    requestStatus: 'requested',
    shortTitle: 'Building a RESTful API',
    requestDescription: 'How to build a RESTful API using .NET Core.',
  },
  {
    videoRequestId: 5,
    userName: 'Alex Lee',
    topic: '.NET Core',
    subTopic: 'Entity Framework',
    requestStatus: 'reviewed',
    shortTitle: 'Entity Framework Best Practices',
    requestDescription: 'Best practices for using Entity Framework in .NET Core applications.',
  }
];
