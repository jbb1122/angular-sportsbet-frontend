import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketBarComponent } from './market-bar.component';

describe('MarketBarComponent', () => {
  let component: MarketBarComponent;
  let fixture: ComponentFixture<MarketBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
