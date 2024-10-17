import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRequestFormComponent } from './video-request-form.component';

describe('VideoRequestFormComponent', () => {
  let component: VideoRequestFormComponent;
  let fixture: ComponentFixture<VideoRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoRequestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
