import { Course } from '../models/course';

export const MOCK_COURSES: Course[] = [
  {
    courseId: 23,
    title: 'Azure functions for beginners ',
    description:
      "This comprehensive course provides a hands-on guide to mastering Azure Functions, focusing on real-world applications and scenarios. Throughout the course, you'll learn how to create and deploy HTTP triggers and timers, implement Azure Durable Functions for function chaining, and use the fan-out/fan-in pattern for parallel processing. \n\nStarting with the basics of setting up your environment, each tutorial builds your understanding of serverless computing with Azure, enabling you to efficiently orchestrate workflows and handle complex tasks in the cloud. \n\nBy the end, you'll be equipped with the skills to streamline workflows and deploy serverless solutions using Azure Functions.",
    price: 10.0,
    courseType: 'Offline',
    seatsAvailable: 10,
    duration: 10.0,
    categoryId: 15,
    instructorId: 5,
    instructorUserId: 25,
    thumbnail:
      'https://lsconlinecoursestorage.blob.core.windows.net/course-preview/23_Azure_functions_for_beginners_',
    startDate: '2024-09-07T00:00:00',
    endDate: '2024-09-07T00:00:00',
    category: {
      categoryId: 15,
      categoryName: 'Azure Cloud Services',
      description:
        'Courses on Azure cloud solutions, including hosting, services, and deployment.',
    },
    userRating: {
      courseId: 23,
      averageRating: 0.0,
      totalRating: 0,
    },
  },
  {
    courseId: 24,
    title: 'Azure functions usage with Storage Account & DOTNET CORE Web API',
    description:
      "This comprehensive course provides a hands-on guide to mastering Azure Functions, focusing on real-world applications and scenarios. Throughout the course, you'll learn how to create and deploy HTTP triggers and timers, implement Azure Durable Functions for function chaining, and use the fan-out/fan-in pattern for parallel processing. \n\nStarting with the basics of setting up your environment, each tutorial builds your understanding of serverless computing with Azure, enabling you to efficiently orchestrate workflows and handle complex tasks in the cloud. \n\nBy the end, you'll be equipped with the skills to streamline workflows and deploy serverless solutions using Azure Functions.",
    price: 0.0,
    courseType: 'Offline',
    seatsAvailable: 0,
    duration: 7.53,
    categoryId: 15,
    instructorId: 5,
    instructorUserId: 25,
    thumbnail:
      'https://lsconlinecoursestorage.blob.core.windows.net/course-preview/24_Azure_functions_usage_with_Storage_Account_%26_DOTNET_CORE_Web_API.png',
    startDate: '2024-09-08T00:00:00',
    endDate: '2024-09-08T00:00:00',
    category: {
      categoryId: 15,
      categoryName: 'Azure Cloud Services',
      description:
        'Courses on Azure cloud solutions, including hosting, services, and deployment.',
    },
    userRating: {
      courseId: 24,
      averageRating: 4.5,
      totalRating: 2,
    },
  },
  {
    courseId: 28,
    title: 'Azure AD Roles & Security Groups',
    description:
      'In this course, we dive deep into the configuration of Azure Active Directory (Azure AD) roles and security groups for .NET Core APIs and Angular applications',
    price: 0.0,
    courseType: 'Offline',
    seatsAvailable: 0,
    duration: 27.0,
    categoryId: 15,
    instructorId: 5,
    instructorUserId: 25,
    thumbnail:
      'https://lsconlinecoursestorage.blob.core.windows.net/course-preview/28_Azure_AD_Roles_%26_Security_Groups.png',
    startDate: '2024-01-01T00:00:00',
    endDate: '2026-01-01T00:00:00',
    category: {
      categoryId: 15,
      categoryName: 'Azure Cloud Services',
      description:
        'Courses on Azure cloud solutions, including hosting, services, and deployment.',
    },
    userRating: {
      courseId: 28,
      averageRating: 0.0,
      totalRating: 0,
    },
  },
  {
    courseId: 29,
    title: 'Azure AD SSO Is in .NET Core',
    description:
      'Get ready for an exhilarating journey as we unveil the ultimate guide to integrating Azure Active Directory (Azure AD) with Single Sign-On (SSO) in your .NET Core Web API and Angular application! ',
    price: 10.0,
    courseType: 'Offline',
    seatsAvailable: 0,
    duration: 0.42,
    categoryId: 15,
    instructorId: 5,
    instructorUserId: 25,
    thumbnail:
      'https://lsconlinecoursestorage.blob.core.windows.net/course-preview/29_Azure_AD_SSO_Is_in_.NET_Core.png',
    startDate: '2024-01-01T00:00:00',
    endDate: '2026-01-01T00:00:00',
    category: {
      categoryId: 15,
      categoryName: 'Azure Cloud Services',
      description:
        'Courses on Azure cloud solutions, including hosting, services, and deployment.',
    },
    userRating: {
      courseId: 29,
      averageRating: 0.0,
      totalRating: 0,
    },
  },
  {
    courseId: 30,
    title:
      'Master Azure AD Authentication in <30 Minutes with Angular and .NET Core 8!',
    description:
      "In this video, we'll walk you through the entire process of configuring Azure Active Directory (Azure AD) for authentication and authorization in an Angular 18 application paired with a .NET Core 8 Web API. Whether you're building enterprise-level applications or personal projects, integrating Azure AD ensures secure and scalable access management for your users.",
    price: 10.0,
    courseType: 'Offline',
    seatsAvailable: 0,
    duration: 0.23,
    categoryId: 15,
    instructorId: 5,
    instructorUserId: 25,
    thumbnail:
      'https://lsconlinecoursestorage.blob.core.windows.net/course-preview/30_Master_Azure_AD_Authentication_in_<30_Minutes_with_Angular_and_.NET_Core_8%21.png',
    startDate: '2024-01-01T00:00:00',
    endDate: '2026-01-01T00:00:00',
    category: {
      categoryId: 15,
      categoryName: 'Azure Cloud Services',
      description:
        'Courses on Azure cloud solutions, including hosting, services, and deployment.',
    },
    userRating: {
      courseId: 30,
      averageRating: 0.0,
      totalRating: 0,
    },
  },
];
