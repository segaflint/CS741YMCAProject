/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: validation for staff accesses to the application.
*/
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { User } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StaffGuard implements CanActivate {

  constructor(
    private router: Router) {}

  canActivate() {
    let user = JSON.parse(localStorage.getItem('user')) as User;
    if (user && user.isStaff){
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
