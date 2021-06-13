import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsListComponent } from './sports-list.component';

describe('SportsListComponent', () => {
  let component: SportsListComponent;
  let fixture: ComponentFixture<SportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
