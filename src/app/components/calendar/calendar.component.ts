import { Component, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CalendarModule, FormsModule],
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
}
