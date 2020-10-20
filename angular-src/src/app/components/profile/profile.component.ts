import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile => {
      this.user = (<any>profile).user;
    },
    error => {
      console.log(error);
      return false;
    });
  }
}
