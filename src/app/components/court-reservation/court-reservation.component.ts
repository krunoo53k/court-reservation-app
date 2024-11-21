import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast"; // Add this
import { MessageService } from "primeng/api"; // Add this
import { CourtService } from "../../services/court.service";
import { TimeSlot, Court } from "../../models/court.model";

@Component({
  selector: "app-court-reservation",
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule], // Add ToastModule
  templateUrl: "./court-reservation.component.html",
  styleUrls: ["./court-reservation.component.css"],
  providers: [MessageService], // Add MessageService to providers
})
export class CourtReservationComponent implements OnInit {
  timeSlots: TimeSlot[] = [];

  constructor(
    private courtService: CourtService,
    private messageService: MessageService,
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
      this.courtService.reserveCourt(timeSlot, court.id).subscribe({
        next: (success) => {
          if (success) {
            court.isVacant = false;
            this.messageService.add({
              severity: "success",
              summary: "Reservation Successful",
              detail: `${court.name} reserved for ${timeSlot}`,
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
}
