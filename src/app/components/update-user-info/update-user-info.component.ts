import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user.interface'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss']
})
export class UpdateUserInfoComponent implements OnInit {

  user: User = {
    userId: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avatarUrl: '',
    bookshelves: []
  }

  constructor(private userSrv: UserService, private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSrv.getUserProfile().subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.log('Error fetching user profile', error);
        
      }
    ) 
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.userSrv.updateUserProfile(this.user.userId, this.user).subscribe(
        (updatedUser: User) => {
          console.log('User updated successfully', updatedUser);
          alert('User info updated successfully!');
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.log('Error updating user', error);
          
        }
      )
    }
  }


}
