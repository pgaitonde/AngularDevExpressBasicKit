import { TestBed, inject } from '@angular/core/testing';

import { HttpMenuItemService } from './http-menu-item.service';

describe('HttpMenuItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpMenuItemService]
    });
  });

  it('should be created', inject([HttpMenuItemService], (service: HttpMenuItemService) => {
    expect(service).toBeTruthy();
  }));
});
