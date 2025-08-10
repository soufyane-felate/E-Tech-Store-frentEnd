import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = 'http://localhost:8085/api/v1/auth/register';
  private loginUrl = 'http://localhost:8085/api/v1/auth/authenticate';

  private userSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(
      this.getUserFromLocalStorage()
    );
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
          console.log('AuthService: Login response user:', response.user);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            localStorage.removeItem('user');
          }
          this.userSubject.next(this.getUserFromLocalStorage());
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
      console.log('AuthService: Stored user from localStorage:', storedUser);
      if (storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        return JSON.parse(storedUser);
      }
    } catch (error) {
      console.error(
        'AuthService: Error parsing stored user data from localStorage:',
        error
      );
      localStorage.removeItem('user');
    }
    return null;
  }

  getUser(): User | null {
    return this.getUserFromLocalStorage();
  }
  /* profile(): Observable<User> {
    const user = this.getUser();
    if (user) {
      return new Observable<User>((observer) => {
        observer.next(user);
        observer.complete();
      });
    } else {
      return new Observable<User>((observer) => {
        observer.error('No user found');
      });
    }
  }
    */
  getUserInfo(): void {
    if (this.isLoggedIn()) {
      const user = this.getUser();
      if (user) {
        console.log('Logged in user information:', {
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } else {
        console.log('User is logged in but no user data available');
      }
    } else {
      console.log('No user is logged in');
    }
  }
}
