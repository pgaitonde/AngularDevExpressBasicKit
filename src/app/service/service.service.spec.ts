import { TestBed } from '@angular/core/testing';
import { Service } from './service.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Service = TestBed.get(Service);
    expect(service).toBeTruthy();
  });
});
