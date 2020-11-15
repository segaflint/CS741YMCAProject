import { Component, OnInit } from '@angular/core';
import { User, AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  curUser: User;
  users: User[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      this.curUser = user;
    },
    error => {
      console.log(error);
      return false;
    });
    this.authService.loadUsers().subscribe((users: User[]) => {
      this.users = users;
    },
    error => {
      console.log(error);
      return false;
    });
  }

  onUserDeleted(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
  }
}
