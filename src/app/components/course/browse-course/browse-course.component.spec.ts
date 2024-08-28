import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCourseComponent } from './browse-course.component';

describe('BrowseCourseComponent', () => {
  let component: BrowseCourseComponent;
  let fixture: ComponentFixture<BrowseCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
