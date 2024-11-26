export interface User {
  id: number;
  username: string;
  reservations: Reservation[];
}

export interface Reservation {
  date: string;
  timeSlot: string;
  courtId: number;
  timestamp: Date;
}
