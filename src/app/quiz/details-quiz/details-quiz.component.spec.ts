import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsQuizComponent } from './details-quiz.component';

describe('DetailsQuizComponent', () => {
  let component: DetailsQuizComponent;
  let fixture: ComponentFixture<DetailsQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsQuizComponent]
    });
    fixture = TestBed.createComponent(DetailsQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
