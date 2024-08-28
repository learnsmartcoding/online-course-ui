import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseByCategoryComponent } from './course-by-category.component';

describe('CourseByCategoryComponent', () => {
  let component: CourseByCategoryComponent;
  let fixture: ComponentFixture<CourseByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
