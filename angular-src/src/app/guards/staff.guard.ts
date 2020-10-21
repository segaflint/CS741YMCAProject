import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(
    private router: Router) {}

  canActivate() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && (<any>user).isStaff){
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
