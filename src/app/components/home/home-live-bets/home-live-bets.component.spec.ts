import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLiveBetsComponent } from './home-live-bets.component';

describe('HomeLiveBetsComponent', () => {
  let component: HomeLiveBetsComponent;
  let fixture: ComponentFixture<HomeLiveBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLiveBetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLiveBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
