import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainInsightsComponent } from './train-insights.component';

describe('TrainInsightsComponent', () => {
  let component: TrainInsightsComponent;
  let fixture: ComponentFixture<TrainInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainInsightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
