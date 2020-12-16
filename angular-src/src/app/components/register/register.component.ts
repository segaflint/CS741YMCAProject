/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: This code is responsible for the register view where a new user will make an account.
*/
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService, User } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name.trim(),
      username: this.username.trim(),
      password: this.password.trim()
    } as User;
    if (!this.validateService.validateRegister(user)) {
      this.flashMessageService.show(
        "Please fill in all of the fields",
        {
          timeout: 2000,
          cssClass: 'alert-danger'
        });
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if ((<any>data).success) {
        this.flashMessageService.show("You have successfully registered!", {cssClass: 'alert-success'});
        this.router.navigate(['/login']);
      } else {
        this.flashMessageService.show("Something didn't work", {cssClass: 'alert-danger'});
        this.router.navigate(['/register']);
      }
    });
  }
}
