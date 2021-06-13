import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSportsComponent } from './all-sports.component';

describe('AllSportsComponent', () => {
  let component: AllSportsComponent;
  let fixture: ComponentFixture<AllSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
