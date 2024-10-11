import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  MsalService,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  EventMessage,
  AuthenticationResult,
  InteractionStatus,
  EventType,
  InteractionType,
  PopupRequest,
  PromptValue,
  RedirectRequest,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

import { Claim } from '../models/claim';
import { createClaimsTable } from '../claim-utils';
import { b2cPolicies } from '../app.config';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private claimsSubject = new BehaviorSubject<Claim[]>([]);
  claims$ = this.claimsSubject.asObservable();
  private userIdSubject = new BehaviorSubject<number>(0);
  userId$ = this.userIdSubject.asObservable();
  loginDisplay = false;
  isLoggedIn = false;
  displayedColumns: string[] = ['claim', 'value', 'description'];
  userName!: string;
  userId!: number;
  userRoles: string[] = [];
  
  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        const claims = payload.account.idTokenClaims;
        this.getClaims(claims);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        const claims =
          this.authService.instance.getActiveAccount()?.idTokenClaims;
        this.getClaims(claims);
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    this.isLoggedIn = this.loginDisplay;
  }

  getClaims(claims: any) {
    if (claims) {
      const claimsTable: Claim[] = createClaimsTable(claims);
      this.claimsSubject.next([...claimsTable]);

      const userIdClaim = claimsTable.find(
        (f) => f.claim === 'extension_userId'
      );

      // Type check before accessing extension_userRoles property
      if (
        'extension_userRoles' in claims &&
        typeof claims.extension_userRoles === 'string'
      ) {
        this.userRoles = claims.extension_userRoles.split(',');
      } else {
        this.userRoles = [];
      }

      if (userIdClaim) {
        this.userIdSubject.next(+userIdClaim.value);
        this.userId = +userIdClaim.value;
      }
      this.userName =
        claimsTable.filter((s) => s.claim === 'given_name')[0].value +
        ', ' +
        claimsTable.filter((s) => s.claim === 'family_name')[0].value;
    } else {
      this.userIdSubject.next(0);
      this.claimsSubject.next([]); // No claims available
      this.userRoles = [];
    }
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    let signUpSignInFlowRequest: RedirectRequest | PopupRequest = {
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      prompt: PromptValue.LOGIN, // force user to reauthenticate with their new password
      scopes: [],
    };

    userFlowRequest = signUpSignInFlowRequest;

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({
            ...this.msalGuardConfig.authRequest,
            ...userFlowRequest,
          } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService
          .loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
          ...userFlowRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout() {
    const activeAccount =
      this.authService.instance.getActiveAccount() ||
      this.authService.instance.getAllAccounts()[0];

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        account: activeAccount,
      });
    } else {
      this.authService.logoutRedirect({
        account: activeAccount,
      });
    }
  }
}
