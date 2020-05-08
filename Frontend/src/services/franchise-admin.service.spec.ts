import { TestBed } from '@angular/core/testing';

import { FranchiseAdminService } from './franchise-admin.service';

describe('FranchiseAdminService', () => {
  let service: FranchiseAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranchiseAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
