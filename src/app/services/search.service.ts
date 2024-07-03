import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private backApiUrl = `${environment.apiURL}books`;
  private apiKey = "AIzaSyAMQnxdMSPS09WjL0kZFmh6riS44HgI0wo"

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`
    });
    
    
  }

  searchBooks(query: string): Observable<any> {
    const searchUrl = `${this.backApiUrl}?q=${query}&key=${this.apiKey}`;
    return this.http.get<any>(searchUrl, {headers: this.getHeaders()});
  }

  saveResults(books: any[]): Observable<any> {
    return this.http.post<any>(this.backApiUrl, books, {headers: this.getHeaders()});
  }
}
