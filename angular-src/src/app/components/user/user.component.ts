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

  constructor(private authService: AuthService,
              private router: Router) {
    if (!this.user) { // TODO: how to better null check consecutive optional properties?
      let navState: any = this.router.getCurrentNavigation();
      if (navState) {
        navState = navState.extras.state;
        if (navState) {
          this.user = navState.user;
          this.isProfile = true;
        }
      }
    }
  }

  ngOnInit(): void {
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
