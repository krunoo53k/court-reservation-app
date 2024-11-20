import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { TimeSlot, Court } from "../models/court.model";

@Injectable({
  providedIn: "root",
})
export class CourtService {
  private mockTimeSlots: TimeSlot[] = this.generateTimeSlots();

  constructor(private http: HttpClient) {}

  private generateTimeSlots(): TimeSlot[] {
    const timeSlots: TimeSlot[] = [];
    const numberOfCourts = 3;

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
    console.log(`Reserving court ${courtId} at ${timeSlot}`);
    return of(true);
  }
}
