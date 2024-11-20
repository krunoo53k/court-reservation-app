import { Routes } from "@angular/router";
import { CourtReservationComponent } from "./components/court-reservation/court-reservation.component";

export const routes: Routes = [
  { path: "", redirectTo: "/courts", pathMatch: "full" },
  { path: "courts", component: CourtReservationComponent },
];
