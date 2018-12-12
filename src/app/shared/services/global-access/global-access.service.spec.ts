import { TestBed, inject } from '@angular/core/testing';

import { GlobalAccessService } from './global-access.service';

describe('GlobalAccessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalAccessService]
    });
  });

  it('should be created', inject([GlobalAccessService], (service: GlobalAccessService) => {
    expect(service).toBeTruthy();
  }));
});
