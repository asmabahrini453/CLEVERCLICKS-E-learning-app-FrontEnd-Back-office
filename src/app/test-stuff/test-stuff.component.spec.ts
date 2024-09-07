import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStuffComponent } from './test-stuff.component';

describe('TestStuffComponent', () => {
  let component: TestStuffComponent;
  let fixture: ComponentFixture<TestStuffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestStuffComponent]
    });
    fixture = TestBed.createComponent(TestStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
