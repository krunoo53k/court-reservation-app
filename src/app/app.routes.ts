import { Routes } from "@angular/router";
import { CourtReservationComponent } from "./components/court-reservation/court-reservation.component";
import { LoginComponent } from "./components/login/login.component";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.parseUrl("/login");
};

export const routes: Routes = [
  { path: "", redirectTo: "/courts", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "courts",
    component: CourtReservationComponent,
    canActivate: [authGuard],
  },
];
