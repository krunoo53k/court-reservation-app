import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtReservationComponent } from './court-reservation.component';

describe('CourtReservationComponent', () => {
  let component: CourtReservationComponent;
  let fixture: ComponentFixture<CourtReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
