import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Registration, RegistrationService } from 'src/app/services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  @Input('user') user: User;
  curUser: User;
  isProfile: boolean;
  registrations: Registration[] = [];

  @Output('userDeleted') userDeleted: EventEmitter<User> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      if (!this.user) {
        this.user = user;
        this.isProfile = true;
        this.loadRegistrations(user);
      }
      this.curUser = user;
    },
    error => {
      console.log(error);
      return false;
    });
    if (this.user) {
      this.loadRegistrations(this.user);
    }
  }

  loadRegistrations(user: User) {
    this.registrationService.loadRegistrationsByUser(user._id).subscribe((registrations: Registration[]) => {
      this.registrations = registrations ? registrations : [];
      console.log(registrations);
    },
    error => {
      console.log(error);
      return false;
    });
  }

  onclickDeleteRegistration(registration: Registration) {
    this.registrationService.deleteRegistration(registration._id).subscribe(() => {
      this.registrations.splice(this.registrations.indexOf(registration), 1);
    },
    error => {
      console.log(error);
      return false;
    });
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
