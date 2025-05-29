import { TestBed } from '@angular/core/testing';

import { RealTimeTrackingService } from './real-time-tracking.service';

describe('RealTimeTrackingService', () => {
  let service: RealTimeTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
