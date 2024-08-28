import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(url: string, type: string): SafeResourceUrl {
      if (type === 'resourceUrl') {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
      return url;
    }
}
