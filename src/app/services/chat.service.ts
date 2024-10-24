import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface ConnectedUser {
  connectionId: string;
  userId: number;
  displayName: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: HubConnection;
  private connectedUsersSubject = new BehaviorSubject<ConnectedUser[]>([]);
  public connectedUsers$ = this.connectedUsersSubject.asObservable();

  private chatQueueSubject = new BehaviorSubject<ConnectedUser[]>([]);
  public chatQueue$ = this.chatQueueSubject.asObservable();

  private adminConnectedSubject = new BehaviorSubject<boolean>(false);
  public isAdminConnected$ = this.adminConnectedSubject.asObservable();

  private chatStartedSubject = new BehaviorSubject<ConnectedUser | null>(null); // Allowing null values
  public chatStarted$ = this.chatStartedSubject.asObservable();

  private messagesSubject = new BehaviorSubject<{ sender: string; content: string }[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private messagestoAdminSubject = new BehaviorSubject<{ sender: string; content: string }[]>([]);
  public messagestoAdmin$ = this.messagestoAdminSubject.asObservable();

  private chatEndedSubject = new BehaviorSubject<ConnectedUser | null>(null); // Allowing null values
  public chatEnded$ = this.chatEndedSubject.asObservable();


  constructor(private msalService: MsalService) {}

  public startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.adb2cConfig.chatHubUrl, {
        accessTokenFactory: async () => {
          const tokenResponse = await this.msalService
            .acquireTokenSilent({
              scopes: [...environment.adb2cConfig.scopeUrls],
            })
            .toPromise();

          return tokenResponse?.accessToken || '';
        },
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.registerHandlers();
      })
      .catch((err) => console.error('Error while starting connection: ' + err));
  }

  private registerHandlers() {
    this.hubConnection.on('UpdateConnectedUsers', (users: ConnectedUser[]) => {
      this.connectedUsersSubject.next(users);
    });

    this.hubConnection.on('UpdateChatQueue', (queue: ConnectedUser[]) => {
      this.chatQueueSubject.next(queue);
    });

    this.hubConnection.on('AdminRegistered', () => {
      this.adminConnectedSubject.next(true);
    });

    this.hubConnection.on('StartChat', (user: ConnectedUser) => {
      console.log('Chat started with user:', user);
      this.chatStartedSubject.next(user);
    });

    this.hubConnection.on('ReceiveMessage', (sender: string, message: string) => {
      const currentMessages = this.messagesSubject.getValue();
      currentMessages.push({ sender, content: message });
      this.messagesSubject.next(currentMessages); // Update with new message
    });

    this.hubConnection.on('EndChat', (user: ConnectedUser) => {
      console.log('Chat ended with user:', user);
      this.chatEndedSubject.next(user);
    });

    this.hubConnection.on('SendMessageToAdmin', (sender: string, message: string) => {
      const currentMessages = this.messagestoAdminSubject.getValue();
      currentMessages.push({ sender, content: message });
      this.messagestoAdminSubject.next(currentMessages); // Update with new message
    });
  }

  public stopConnection() {
    this.hubConnection
      .stop()
      .catch((err) => console.error('Error stopping connection', err));
  }

  public joinChatQueue() {
    this.hubConnection
      .invoke('JoinChatQueue')
      .catch((err) => console.error('Error joining chat queue', err));
  }

  public registerAdmin() {
    this.hubConnection
      .invoke('RegisterAdmin')
      .catch((err) => console.error('Error registering admin', err));
  }

  public connectWithUser(connectionId: string) {
    this.hubConnection
      .invoke('ConnectWithUser', connectionId)
      .catch((err) => console.error('Error connecting with user', err));
  }

  public sendMessage(message: string) {
    this.hubConnection
      .invoke('SendMessage', message)
      .catch((err) => console.error('Error sending message', err));
  }

  public sendMessageToAdmin(message: string) {
    this.hubConnection
      .invoke('SendMessageToAdmin', message)
      .catch((err) => console.error('Error sending message', err));
  }

  public endChat() {
    this.hubConnection
      .invoke('EndChat')
      .catch((err) => console.error('Error connecting with user', err));
  }
}
