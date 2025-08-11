import { TestBed } from '@angular/core/testing';

import { LogServices } from './log-services';

describe('LogServices', () => {
  let service: LogServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
