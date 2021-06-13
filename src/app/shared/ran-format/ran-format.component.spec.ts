import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RanFormatComponent } from './ran-format.component';

describe('RanFormatComponent', () => {
  let component: RanFormatComponent;
  let fixture: ComponentFixture<RanFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RanFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RanFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
