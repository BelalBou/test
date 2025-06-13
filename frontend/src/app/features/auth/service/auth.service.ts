import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // adapte si besoin
  private roleSubject = new BehaviorSubject<string | null>(
    this.getRoleFromToken()
  );
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post<{ token: string }>(`${this.apiUrl}/login`, data)
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);

            const decoded = this.decodeToken(res.token);
            const role = decoded?.role || null;
            if (role) {
              this.roleSubject.next(role);
            }

            observer.next(res);
            observer.complete();
          },
          error: (err) => observer.error(err),
        });
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any | null {
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isVendor(): boolean {
    return this.getRole() === 'vendor';
  }

  setRole(role: string) {
    this.roleSubject.next(role);
  }

  clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // facultatif ici
    this.roleSubject.next(null);
  }
}
