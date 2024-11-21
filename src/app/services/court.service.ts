import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { TimeSlot, Court } from "../models/court.model";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class CourtService {
  private mockTimeSlots: TimeSlot[] = this.generateTimeSlots();
  private maxReservationsPerUser = 2;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private generateTimeSlots(): TimeSlot[] {
    const timeSlots: TimeSlot[] = [];
    const numberOfCourts = Math.floor(Math.random() * (12 - 4 + 1)) + 4; // Generates a random number between 4 and 12

    for (let hour = 9; hour <= 21; hour++) {
      const time =
        hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`;

      const courts: Court[] = [];

      for (let courtNum = 1; courtNum <= numberOfCourts; courtNum++) {
        courts.push({
          id: courtNum,
          name: `Court ${courtNum}`,
          isVacant: Math.random() < 0.5,
        });
      }

      timeSlots.push({
        time,
        courts,
      });
    }

    return timeSlots;
  }

  getTimeSlots(): Observable<TimeSlot[]> {
    return of(this.mockTimeSlots);
  }

  reserveCourt(timeSlot: string, courtId: number): Observable<boolean> {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return of(false);
    }

    if (currentUser.reservations.length >= this.maxReservationsPerUser) {
      return of(false);
    }

    currentUser.reservations.push({
      timeSlot,
      courtId,
      timestamp: new Date(),
    });

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    const slot = this.mockTimeSlots.find((s) => s.time === timeSlot);
    if (slot) {
      const court = slot.courts.find((c) => c.id === courtId);
      if (court) {
        court.isVacant = false;
      }
    }

    return of(true);
  }

  vacateCourt(timeSlot: string, courtId: number): Observable<boolean> {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return of(false);
    }

    const reservationIndex = currentUser.reservations.findIndex(
      (r) => r.timeSlot === timeSlot && r.courtId === courtId,
    );

    if (reservationIndex === -1) {
      return of(false);
    }

    currentUser.reservations.splice(reservationIndex, 1);

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    const slot = this.mockTimeSlots.find((s) => s.time === timeSlot);
    if (slot) {
      const court = slot.courts.find((c) => c.id === courtId);
      if (court) {
        court.isVacant = true;
      }
    }

    return of(true);
  }

  isUsersCourt(timeSlot: string, courtId: number): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return false;

    return currentUser.reservations.some(
      (r) => r.timeSlot === timeSlot && r.courtId === courtId,
    );
  }

  getUserReservationsCount(): number {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.reservations.length : 0;
  }
}
