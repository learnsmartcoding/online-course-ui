import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClaimsComponent } from './view-claims.component';

describe('ViewClaimsComponent', () => {
  let component: ViewClaimsComponent;
  let fixture: ComponentFixture<ViewClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClaimsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
