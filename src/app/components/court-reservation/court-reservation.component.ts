import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CourtService } from "../../services/court.service";
import { TimeSlot, Court } from "../../models/court.model";

@Component({
  selector: "app-court-reservation",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: "./court-reservation.component.html",
  styleUrls: ["./court-reservation.component.css"],
})
export class CourtReservationComponent implements OnInit {
  timeSlots: TimeSlot[] = [];

  constructor(private courtService: CourtService) {}

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
      this.courtService
        .reserveCourt(timeSlot, court.id)
        .subscribe((success) => {
          if (success) {
            court.isVacant = false;
            console.log("Court reserved successfully");
          }
        });
    }
  }
}
