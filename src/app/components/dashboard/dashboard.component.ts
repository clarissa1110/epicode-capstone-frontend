import { Component, OnInit } from '@angular/core';
import { BookResponse } from 'src/app/models/books.interface';
import { Bookshelf } from 'src/app/models/bookshelf.interface';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  searchQuery: string = '';
  books: BookResponse[] = [];
  bookshelves: Bookshelf[] = [];
  selectedBookshelfId!: number;

  constructor(private searchSrv: SearchService, private userSrv: UserService) {}

  ngOnInit(): void {
      this.userSrv.getBookshelves().subscribe(
        (bookshelves: Bookshelf[]) => {
          this.bookshelves = bookshelves;

          if (this.bookshelves.length > 0) {
            this.selectedBookshelfId = this.bookshelves[0].bookshelfId;
          }
        },
      (error) => {
        console.log("Error fetching bookshelves", error);
        
      })
  }
  
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

  addToBookshelf(bookId: number) {
    if (this.selectedBookshelfId) {
      this.userSrv.addBookToBookshelf(this.selectedBookshelfId, bookId).subscribe(
        (response) => {
          console.log("Book with id: " + bookId + "added to bookshelf with id: " + this.selectedBookshelfId, response);    
          alert('Book successfully added to your favourites!');      
        },
        (error) => {
          console.log("Error adding book to bookshelf", error);          
        }
      )
    }
    
  }
}
