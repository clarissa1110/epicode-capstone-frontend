import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.interface';
import { catchError } from 'rxjs/operators';
import { Bookshelf } from '../models/bookshelf.interface';
import { BookResponse } from '../models/books.interface';

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

  updateUserProfile(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}users/${userId}`, userData).pipe(
      catchError(error => {
        console.log('Error updating user data', error);
        return throwError(error);      
      })
    )
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

  createBookshelf(name: string): Observable<Bookshelf> {
    const userId = this.authSrv.getCurrentUserId();
    return this.http.post<Bookshelf>(`${this.apiUrl}users/${userId}/bookshelves`, { name });
  }

  addBookToBookshelf(bookshelfId: number, bookId: number): Observable<any> {
    const userId = this.authSrv.getCurrentUserId();
    if (userId !== null) {
      return this.http.post(
        `${this.apiUrl}users/${userId}/bookshelves/${bookshelfId}/books/${bookId}`, 
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


  getBooksInBookshelf(bookshelfId: number): Observable<Bookshelf> {
    const userId = this.authSrv.getCurrentUserId();
    return this.http.get<Bookshelf>(`${this.apiUrl}users/${userId}/bookshelves/${bookshelfId}/books`).pipe(
      catchError(error => {
        console.error('Error fetching books in bookshelf', error);
        return throwError(() => new Error('Error fetching books in bookshelf'));
      })
    );
  }

  removeFromBookshelf(bookshelfId: number, bookId: number): Observable<void> {
    const userId = this.authSrv.getCurrentUserId();
    return this.http.delete<void>(`${this.apiUrl}users/${userId}/bookshelves/${bookshelfId}/books/${bookId}`).pipe(
      catchError(error => {
        console.log('Error removing book with id: ' + bookId + 'from bookshelf', error);
        return throwError(error);        
      })
    )
  }
}
