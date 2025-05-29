import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealAvailabilityComponent } from './meal-availability.component';

describe('MealAvailabilityComponent', () => {
  let component: MealAvailabilityComponent;
  let fixture: ComponentFixture<MealAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
