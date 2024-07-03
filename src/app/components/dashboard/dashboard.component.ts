import { Component } from '@angular/core';
import { BookResponse } from 'src/app/models/books.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  searchQuery: string = '';
  books: BookResponse[] = []

  constructor(private searchSrv: SearchService) {}
  
  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchSrv.searchBooks(this.searchQuery).subscribe(
        (response: BookResponse[]) => {
          this.books = response;
          console.log(response);
          
         // this.searchSrv.saveResults(this.books).subscribe();
        },
        (error) => {
          console.log('Error fetching books', error);          
        }
      );
    }
  }
}
