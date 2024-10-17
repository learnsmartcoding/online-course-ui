import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRequestsComponent } from './video-requests.component';

describe('VideoRequestsComponent', () => {
  let component: VideoRequestsComponent;
  let fixture: ComponentFixture<VideoRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
