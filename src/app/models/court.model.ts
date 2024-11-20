export interface Court {
  id: number;
  name: string;
  isVacant: boolean;
}

export interface TimeSlot {
  time: string;
  courts: Court[];
}
