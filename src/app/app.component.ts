import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CourtReservationComponent } from "./components/court-reservation/court-reservation.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CourtReservationComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "klasije";
}
