import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCalendarComponent } from './owner-calendar.component';

describe('OwnerCalendarComponent', () => {
  let component: OwnerCalendarComponent;
  let fixture: ComponentFixture<OwnerCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
