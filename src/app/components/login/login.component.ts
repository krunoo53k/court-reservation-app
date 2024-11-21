import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CardModule } from "primeng/card";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [MessageService],
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  onLogin(): void {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(["/courts"]);
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Login Failed",
            detail: "Invalid username or password",
          });
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
