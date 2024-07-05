import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/register.interface';
import { environment } from 'src/environments/environment.development';
import { AuthData } from '../models/auth-data.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Bookshelf } from '../models/bookshelf.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiURL;

  private authSub = new BehaviorSubject<AuthData | null>(null);
  user$ = this.authSub.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  signUp(data: Register) {
    return this.http
      .post(`${this.apiURL}auth/register`, data)
      .pipe(catchError(this.errors));
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}auth/login`, data).pipe(
      tap((data) => {
        console.log('Auth data: ', data);
      }),
      tap((data) => {
        this.authSub.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        
      }),
      catchError(this.errors)
    );
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  restore() {
    const userJson = localStorage.getItem('user');

    if (!userJson) {
      return
    }

    const user: AuthData = JSON.parse(userJson);
    this.authSub.next(user);    
  }

  getCurrentUserId(): number | null {
    const userJson = localStorage.getItem('user');
    console.log('User JSON from localStorage: ', userJson);
    
    if (userJson) {
      const parsedJson = JSON.parse(userJson);
      
      console.log('User ID from parsed JSON: ', parsedJson.user.userId);
      return parsedJson.user.userId;
    }
    
    return null;
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    });
  }

  getUserBookshelves(): Observable<Bookshelf[]> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return throwError('User ID not found');
    }
    return this.http.get<Bookshelf[]>(`${this.apiURL}users/${userId}/bookshelves`, {
      headers: this.getHeaders(),
    }).pipe(
      catchError((error) => {
        console.error('Error fetching bookshelves', error);
        return throwError(error);
      })
    );
  }

  private errors(err: any) {
    console.log(err);
    
    switch (err.error) {
      case 'Email already exists':
        return throwError('User already exists');
        break;

      case 'Bad credentials':
        return throwError('Incorrect username or password');
        break;

      default:
        return throwError('Error');
        break;
    }
  }
}
