import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  @Input('user') user: User;
  isProfile: boolean;

  @Output('userDeleted') userDeleted: EventEmitter<User> = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.user) {
      this.authService.getProfile().subscribe(user => {
        this.user = user;
        this.isProfile = true;
      },
      error => {
        console.log(error);
        return false;
      });
    }
  }

  onClickDeleteUser() {
    this.authService.deleteUser(this.user._id).subscribe(() => {
      this.userDeleted.emit(this.user);
    },
    error => {
      console.log(error);
      return false;
    });
  }
}
