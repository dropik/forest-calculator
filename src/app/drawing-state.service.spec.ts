import { TestBed } from '@angular/core/testing';

import { DrawingStateService } from './drawing-state.service';

describe('DrawingStateService', () => {
  let service: DrawingStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawingStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
