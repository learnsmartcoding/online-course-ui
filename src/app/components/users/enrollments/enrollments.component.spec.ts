import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsComponent } from './enrollments.component';

describe('EnrollmentsComponent', () => {
  let component: EnrollmentsComponent;
  let fixture: ComponentFixture<EnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
