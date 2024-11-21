import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private mockUsers = [
    { id: 1, username: "user1", password: "password1", reservations: [] },
    { id: 2, username: "user2", password: "password2", reservations: [] },
  ];

  constructor() {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const user = this.mockUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      const { password: _, ...safeUser } = user;
      localStorage.setItem("currentUser", JSON.stringify(safeUser));
      this.currentUserSubject.next(safeUser);
      return of(true);
    }

    return of(false);
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
