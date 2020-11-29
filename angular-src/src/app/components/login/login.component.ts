import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if ((<any>data).success) {
        this.authService.storeUserData((<any>data).token, (<any>data).user);
        this.flashMessageService.show("You have successfully logged in!", {cssClass: 'alert-success'});
        this.router.navigate(['/programs']);
      } else {
        this.flashMessageService.show("User not found", {cssClass: 'alert-danger'});
        this.router.navigate(['/login']);
      }
    });
  }
}
