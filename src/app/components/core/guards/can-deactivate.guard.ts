// can-deactivate.guard.ts
export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Promise<boolean>;
  }
  

  // can-deactivate.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { VideoRequestFormComponent } from '../../user-ask/video-request-form/video-request-form.component';


@Injectable({
  providedIn: 'root',
})
export class canDeactivateGuard implements CanDeactivate<VideoRequestFormComponent> {
  canDeactivate(component: VideoRequestFormComponent): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
