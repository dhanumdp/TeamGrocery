import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseAdminComponent } from './franchise-admin.component';

describe('FranchiseAdminComponent', () => {
  let component: FranchiseAdminComponent;
  let fixture: ComponentFixture<FranchiseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
