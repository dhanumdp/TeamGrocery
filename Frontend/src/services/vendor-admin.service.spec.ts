import { TestBed } from '@angular/core/testing';

import { VendorAdminService } from './vendor-admin.service';

describe('VendorAdminService', () => {
  let service: VendorAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
