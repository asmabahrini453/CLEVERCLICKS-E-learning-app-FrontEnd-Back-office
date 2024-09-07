import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAdminComponent } from './details-admin.component';

describe('DetailsAdminComponent', () => {
  let component: DetailsAdminComponent;
  let fixture: ComponentFixture<DetailsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsAdminComponent]
    });
    fixture = TestBed.createComponent(DetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
