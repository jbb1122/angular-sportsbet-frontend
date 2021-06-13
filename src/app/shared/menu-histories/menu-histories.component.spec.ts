import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHistoriesComponent } from './menu-histories.component';

describe('MenuHistoriesComponent', () => {
  let component: MenuHistoriesComponent;
  let fixture: ComponentFixture<MenuHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuHistoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
