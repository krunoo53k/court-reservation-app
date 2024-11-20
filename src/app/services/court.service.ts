import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { TimeSlot, Court } from "../models/court.model";

@Injectable({
  providedIn: "root",
})
export class CourtService {
  // Simulated data - replace with actual API calls
  private mockTimeSlots: TimeSlot[] = [
    {
      time: "9:00 AM",
      courts: [
        { id: 1, name: "Court 1", isVacant: true },
        { id: 2, name: "Court 2", isVacant: false },
        { id: 3, name: "Court 3", isVacant: true },
      ],
    },
    {
      time: "10:00 AM",
      courts: [
        { id: 1, name: "Court 1", isVacant: false },
        { id: 2, name: "Court 2", isVacant: true },
        { id: 3, name: "Court 3", isVacant: true },
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  getTimeSlots(): Observable<TimeSlot[]> {
    return of(this.mockTimeSlots);
  }

  reserveCourt(timeSlot: string, courtId: number): Observable<boolean> {
    console.log(`Reserving court ${courtId} at ${timeSlot}`);
    return of(true);
  }
}
