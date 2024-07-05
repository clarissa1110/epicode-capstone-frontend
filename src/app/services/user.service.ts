import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.interface';
import { catchError } from 'rxjs/operators';
import { Bookshelf } from '../models/bookshelf.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private authSrv: AuthService) { }

 
  getUserProfile(): Observable<User> {
    const userId = this.authSrv.getCurrentUserId();
    if (userId !== null) {
      return this.http.get<User>(`${this.apiUrl}users/${userId}`, { headers: this.authSrv.getHeaders() }).pipe(
        catchError(error => {
          console.error('Error fetching user profile', error);
          return throwError(error);
        })
      );
    }
    return throwError('User not logged in');
  }

  getBookshelves(): Observable<Bookshelf[]> {
    const userId = this.authSrv.getCurrentUserId();
    if (userId !== null) {
      return this.http.get<Bookshelf[]>(`${this.apiUrl}users/${userId}/bookshelves`, { headers: this.authSrv.getHeaders() }).pipe(
        catchError(error => {
          console.error('Error fetching bookshelves', error);
          return throwError(error);
        })
      );
    }
    return throwError('User not logged in');
  }

  addBookToBookshelf(bookshelfId: number, bookId: number): Observable<any> {
    const userId = this.authSrv.getCurrentUserId();
    if (userId !== null) {
      return this.http.post(
        `${this.apiUrl}users/${userId}/bookshelf/${bookshelfId}/books/${bookId}`, 
        null, 
        { headers: this.authSrv.getHeaders() }
      ).pipe(
        catchError(error => {
          console.error('Error adding book to bookshelf', error);
          return throwError(error);
        })
      );
    }
    return throwError('User not logged in');
  }
}
