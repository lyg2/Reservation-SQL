import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulReservationComponent } from './successful-reservation-page.component.ts.js';

describe('SuccessfulReservationComponent', () => {
  let component: SuccessfulReservationComponent;
  let fixture: ComponentFixture<SuccessfulReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
