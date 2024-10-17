import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRequestsListComponent } from './video-requests-list.component';

describe('VideoRequestsListComponent', () => {
  let component: VideoRequestsListComponent;
  let fixture: ComponentFixture<VideoRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoRequestsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
