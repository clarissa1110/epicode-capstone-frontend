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
  user!: User | null;
  bookshelves: Bookshelf[] = [];
  favouriteBooks: BookResponse[] = [];

  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.userSrv.getUserProfile().subscribe(
      (data: User) => {
      this.user = data;
      this.bookshelves = data.bookshelves;

      const favouritesShelf = this.bookshelves.find(shelf => shelf.name === 'Favourites');
      this.favouriteBooks = favouritesShelf ? favouritesShelf.bookList : [];
    },
  (error) => {
    console.log("Error fetching user profile", error);
    
  })
  }
  
}
