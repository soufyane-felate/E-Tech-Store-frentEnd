import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:8080/api/v1/auth/register';
  private loginUrl = 'http://localhost:8080/api/v1/auth/authenticate';

  private userSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
    this.currentUser = this.userSubject.asObservable();
  }

  register(user: any): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.userSubject.next(response.user);
          } else {
            localStorage.removeItem('user');
            this.userSubject.next(null);
          }
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getUserFromLocalStorage(): User | null {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        return JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Error parsing stored user data from localStorage:', error);
      localStorage.removeItem('user');
    }
    return null;
  }

  getUser(): User | null {
    return this.getUserFromLocalStorage();
  }
}
