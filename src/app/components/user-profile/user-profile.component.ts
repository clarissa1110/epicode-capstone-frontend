import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { BookResponse } from 'src/app/models/books.interface';
import { Bookshelf } from 'src/app/models/bookshelf.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  user!: User;
  bookshelves: Bookshelf[] = [];
  newBookshelfName: string = '';
  favouriteBooks: BookResponse[] = [];

  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    this.fetchUserBookshelves();
    this.loadFavouriteBooks();
  }

  fetchUserProfile() {
    this.userSrv.getUserProfile().subscribe(
      (data: User) => {
        this.user = data;
      },
    (error) => {
      console.log('Error fetching user profile', error);
      
    })
  }

  fetchUserBookshelves() {
    this.userSrv.getBookshelves().subscribe(
      (data: Bookshelf[]) => {
        this.bookshelves = data;
        console.log(this.bookshelves);
        
      },
      (error) => {
        console.log('Error fetching bookshelves', error);
        
      }
    )
  }

  loadFavouriteBooks() {
    const favouriteBookshelf = this.bookshelves.find(bookshelf => bookshelf.name === 'favourite books');
    if (favouriteBookshelf) {
      this.userSrv.getBooksInBookshelf(favouriteBookshelf.bookshelfId).subscribe(
        (books: Bookshelf) => {
          this.favouriteBooks = books.bookList;
          console.log(this.favouriteBooks);
          
        },
        (error) => {
          console.error('Error fetching favorite books', error);
        }
      );
    }
  }

  removeBookFromBookshelf(bookId: number) {
    const favouriteBookshelf = this.bookshelves.find(bookshelf => bookshelf.name === 'favourite books');
    if (favouriteBookshelf) {
      this.userSrv.removeFromBookshelf(favouriteBookshelf.bookshelfId, bookId).subscribe(
        () => {
          this.favouriteBooks = this.favouriteBooks.filter(book => book.bookId !== bookId);
          console.log('Book removed successfully!');     
          alert('Book removed successfully!');
          this.fetchUserBookshelves();    
        },
        (error) => {
          console.log('Error removing book from bookshelf', error);
          
        }
      )
    }
  }

  createBookshelf() {
    this.userSrv.createBookshelf(this.newBookshelfName).subscribe(
      (response: Bookshelf) => {
        this.bookshelves.push(response);
        
      }
    )
  }

  openCreateBookshelfModal() {
    const modal = document.getElementById('createBookshelfModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  closeCreateBookshelfModal() {
    const modal = document.getElementById('createBookshelfModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('show');
    }
  }
  
}
