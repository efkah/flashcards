import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckHelpComponent } from './deck-help.component';

describe('DeckHelpComponent', () => {
  let component: DeckHelpComponent;
  let fixture: ComponentFixture<DeckHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
