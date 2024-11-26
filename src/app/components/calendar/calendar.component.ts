import { Component } from "@angular/core";
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
  date: Date | undefined;
}
