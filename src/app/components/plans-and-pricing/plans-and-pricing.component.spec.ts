import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAndPricingComponent } from './plans-and-pricing.component';

describe('PlansAndPricingComponent', () => {
  let component: PlansAndPricingComponent;
  let fixture: ComponentFixture<PlansAndPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansAndPricingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansAndPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
