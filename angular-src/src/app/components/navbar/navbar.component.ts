import { Component, OnInit } from '@angular/core';
import { User, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(
    private flashMessageService: FlashMessagesService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      this.user = user;
    },
    error => {
      console.log(error);
      return false;
    });
  }
  
  getFragment() {
    return this.router.url.includes("/help") ? undefined : this.router.url.substring(1);
  }

  onLogoutClick() {
    this.user = undefined;
    this.authService.logout();
    this.flashMessageService.show(
      "You have been logged out.",
      { 
        cssClass: "alert-success",
        timeout: 5000
      });
    this.router.navigate(['/']);
    return false;
  }
}
