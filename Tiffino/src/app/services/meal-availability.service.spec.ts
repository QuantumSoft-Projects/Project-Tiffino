import { TestBed } from '@angular/core/testing';

import { MealAvailabilityService } from './meal-availability.service';

describe('MealAvailabilityService', () => {
  let service: MealAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
