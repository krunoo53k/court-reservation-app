import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarModule, FormsModule, ButtonModule],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.css",
})
export class CalendarComponent {
  date: Date = new Date();
  minDate: Date = new Date();
  @Output() dateChange = new EventEmitter<Date>();

  onDateSelect(event: any) {
    this.dateChange.emit(this.date);
  }

  nextDay() {
    const nextDate = new Date(this.date);
    nextDate.setDate(nextDate.getDate() + 1);
    this.date = nextDate;
    this.dateChange.emit(this.date);
  }

  previousDay() {
    const prevDate = new Date(this.date);
    prevDate.setDate(prevDate.getDate() - 1);
    if (prevDate >= this.minDate) {
      this.date = prevDate;
      this.dateChange.emit(this.date);
    }
  }

  isPreviousDayDisabled(): boolean {
    const currentDate = new Date(this.date);
    const minDate = new Date(this.minDate);

    currentDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);

    return currentDate.getTime() <= minDate.getTime();
  }
}
