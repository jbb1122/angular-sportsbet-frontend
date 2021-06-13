import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetItemComponent } from './bet-item.component';

describe('BetItemComponent', () => {
  let component: BetItemComponent;
  let fixture: ComponentFixture<BetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
