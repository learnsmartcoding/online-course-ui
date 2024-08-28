import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import {
  EventMessage,
  AuthenticationResult,
  InteractionStatus,
  EventType,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

import { Claim } from '../models/claim';
import { createClaimsTable } from '../claim-utils';

@Injectable({ providedIn: 'root' })
export class LoginService {  
  private claimsSubject = new BehaviorSubject<Claim[]>([]);
  claims$ = this.claimsSubject.asObservable();
  private userIdSubject = new BehaviorSubject<number>(0);
  userId$ = this.userIdSubject.asObservable();
  loginDisplay = false;
  displayedColumns: string[] = ['claim', 'value', 'description'];

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
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
  }

  getClaims(claims: any) {
    if (claims) {
      const claimsTable: Claim[] = createClaimsTable(claims);
      this.claimsSubject.next([...claimsTable]);

      const userIdClaim = claimsTable.find(
        (f) => f.claim === 'extension_userId'
      );
      if (userIdClaim) {
        this.userIdSubject.next(+userIdClaim.value);
      }
    } else {
      this.userIdSubject.next(0);
      this.claimsSubject.next([]); // No claims available
    }
  }
}
