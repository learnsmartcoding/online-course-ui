import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/usermodel';
import { UserProfileService } from '../../../services/user-profile.service';
import { RouterModule } from '@angular/router';

interface ConnectedUser {
  connectionId: string;
  userId: number;
  displayName: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  userId = 25; //hard coded value for current admin.

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
  loggedInUser: UserModel = {
    userId: 0,
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    adObjId: '',
    profilePictureUrl: '',
    bio: '',
  };

  isAdmin: boolean = false;
  message: string = '';
  connectedUsers$: any;
  chatQueue$: any;
  isAdminConnected$: any;
  chatStarted$: any;
  chatEnded!: ConnectedUser | null;
  currentChatUser: any = null; // Stores the current user in chat
  messages: { sender: string; content: string }[] = [];
  statusMessage: string = 'You are not connected yet with anyone to chat!';
  private messagesSubscription!: Subscription;

  messagesToAdmin: { sender: string; content: string }[] = [];
  private messagesToAdminSubscription!: Subscription;
  messageToAdmin: string = '';

  constructor(
    private chatService: ChatService,
    private loginService: LoginService,
    private toastrService: ToastrService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.isAdmin =
      this.loginService.userRoles.filter((f) => f === 'Admin').length > 0;
    // Initialize the observables after the service is initialized
    this.connectedUsers$ = this.chatService.connectedUsers$;
    this.chatQueue$ = this.chatService.chatQueue$;
    this.isAdminConnected$ = this.chatService.isAdminConnected$;
    this.chatStarted$ = this.chatService.chatStarted$;
    this.chatService.chatEnded$.subscribe((s) => {
      this.chatEnded = s;
      if (this.messages.length > 0) {
        this.toastrService.info(
          'Your chat has been ended. You can check the transcript from the website.',
          'Chat Ended'
        );
      }
      this.messages = [];
    });

    this.chatService.startConnection();

    // If the current user is an admin, register them as an admin
    this.chatService.isAdminConnected$.subscribe((isAdmin) => {
      if (isAdmin) {
        this.chatService.registerAdmin();
      }
    });

    // Subscribe to the messages observable to receive chat messages
    this.messagesSubscription = this.chatService.messages$.subscribe(
      (messages) => {
        this.messages = messages;
      }
    );

    this.chatService.chatStarted$.subscribe((data) => {
      this.statusMessage = data
        ? `You are now connected with ${data?.displayName}`
        : this.statusMessage;
    });

    // Subscribe to the messages observable to receive chat messages
    this.messagesToAdminSubscription =
      this.chatService.messagestoAdmin$.subscribe((messages) => {
        this.messagesToAdmin = messages;
      });

    setTimeout(() => {
      if (this.isAdmin) {
        this.chatService.registerAdmin();
      } else {
        this.joinChatQueue();
      }
    }, 3000);

    this.getUserProfile();
  }

  connectWithUser(connectionIdOfUser: string) {
    this.chatService.connectWithUser(connectionIdOfUser);
    // Set the current chat user to show chat window
    this.currentChatUser = connectionIdOfUser;
  }

  sendMessage(message: string) {
    if (message) {
      console.log('Message sent to:', message);
      this.chatService.sendMessage(this.message); // Send the message through the service
      this.message = ''; // Clear the input box
    }
  }

  sendMessageToAdmin(message: string) {
    if (message) {
      console.log('Message sent to admin:', message);
      this.chatService.sendMessageToAdmin(this.messageToAdmin); // Send the message through the service
      this.messageToAdmin = ''; // Clear the input box
    }
  }

  endChat() {
    this.chatService.endChat();
  }

  joinChatQueue() {
    this.chatService.joinChatQueue();
  }
  registerAdmin() {
    this.chatService.registerAdmin();
  }

  ngOnDestroy(): void {
    this.chatService.stopConnection();
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    if (this.messagesToAdminSubscription) {
      this.messagesToAdminSubscription.unsubscribe();
    }
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

    this.loginService.userId$.subscribe((u) => {
      this.userService.getUserProfile(u).subscribe({
        next: (data) => {
          this.loggedInUser = data;
        },
        error: (err) => {
          console.error('Error fetching user profile', err);
        },
      });
    });
  }

  // Listen for window close or refresh
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.chatService.stopConnection();
  }
}
