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
  displayUsers: User[];
  query: string = "";

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
      this.displayUsers = users;
    },
    error => {
      console.log(error);
      return false;
    });
  }

  onUserDeleted(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
    this.search();
  }

  queryKeyDown(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.query = this.query.trim();
    if (!this.query || this.query === "") {
      this.displayUsers = this.users;
    } else {
      this.displayUsers = this.users.filter(user => {
        return user.name.toLowerCase().includes(this.query.toLowerCase()) || user.username.toLowerCase().includes(this.query.toLowerCase());
      });
    }
  }
}
