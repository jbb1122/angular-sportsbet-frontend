import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeImportantWelcomesComponent } from './home-important-welcomes.component';

describe('HomeImportantWelcomesComponent', () => {
  let component: HomeImportantWelcomesComponent;
  let fixture: ComponentFixture<HomeImportantWelcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeImportantWelcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeImportantWelcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
