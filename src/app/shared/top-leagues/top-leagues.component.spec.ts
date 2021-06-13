import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeaguesComponent } from './top-leagues.component';

describe('TopLeaguesComponent', () => {
  let component: TopLeaguesComponent;
  let fixture: ComponentFixture<TopLeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLeaguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
