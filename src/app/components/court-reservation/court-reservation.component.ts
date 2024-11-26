import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { CourtService } from "../../services/court.service";
import { TimeSlot, Court } from "../../models/court.model";
import { AuthService } from "../../services/auth.service";
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: "app-court-reservation",
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule, CalendarComponent],
  templateUrl: "./court-reservation.component.html",
  styleUrls: ["./court-reservation.component.css"],
  providers: [MessageService],
})
export class CourtReservationComponent implements OnInit {
  timeSlots: TimeSlot[] = [];

  constructor(
    private courtService: CourtService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loadTimeSlots();
  }

  loadTimeSlots() {
    this.courtService.getTimeSlots().subscribe((slots) => {
      this.timeSlots = slots;
    });
  }

  reserveCourt(timeSlot: string, court: Court) {
    if (court.isVacant) {
      const currentReservations = this.courtService.getUserReservationsCount();
      if (currentReservations >= 2) {
        this.messageService.add({
          severity: "error",
          summary: "Reservation Failed",
          detail: "You have reached the maximum number of reservations (2)",
        });
        return;
      }

      this.courtService.reserveCourt(timeSlot, court.id).subscribe({
        next: (success) => {
          if (success) {
            court.isVacant = false;
            this.messageService.add({
              severity: "success",
              summary: "Reservation Successful",
              detail: `${court.name} reserved for ${timeSlot}`,
            });
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Reservation Failed",
              detail: "Unable to reserve the court.",
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Reservation Failed",
            detail: "Unable to reserve the court. Please try again.",
          });
        },
      });
    }
  }

  vacateCourt(timeSlot: string, court: Court) {
    if (this.courtService.isUsersCourt(timeSlot, court.id)) {
      this.courtService.vacateCourt(timeSlot, court.id).subscribe({
        next: (success) => {
          if (success) {
            court.isVacant = true;
            this.messageService.add({
              severity: "success",
              summary: "Court Vacated",
              detail: `${court.name} has been vacated`,
            });
          }
        },
      });
    }
  }

  isUsersCourt(timeSlot: string, court: Court): boolean {
    return this.courtService.isUsersCourt(timeSlot, court.id);
  }
}
