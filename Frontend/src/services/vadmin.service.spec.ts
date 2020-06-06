import { TestBed } from '@angular/core/testing';

import { VadminService } from './vadmin.service';

describe('VadminService', () => {
  let service: VadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
