export interface User {
  id: number;
  username: string;
  reservations: Reservation[];
}

export interface Reservation {
  timeSlot: string;
  courtId: number;
  timestamp: Date;
}
