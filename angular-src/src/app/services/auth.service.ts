/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: service responsible for user authentication and calling API for database manipulation and access.
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {
  _id: string;
  name: string;
  username: string;
  password: string;
  isMember: boolean;
  isStaff: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;
  user: User;

  constructor(private http: HttpClient) { }

  loadUsers() {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get("http://localhost:3000/users", {headers})
      .pipe(map((res: User[]) => res));
  }

  registerUser(user: Object) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/users/register", user, {headers: headers})
      .pipe(map((res: Response) => res));
  }

  authenticateUser(user: Object) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:3000/users/authenticate", user, {headers: headers})
      .pipe(map((res: Response) => res));
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get("http://localhost:3000/users/profile", {headers: headers})
      .pipe(map((res: User) => res));
  }
  
  updateUser(user) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(`http://localhost:3000/users/${user._id}`, user, {headers: headers})
      .pipe(map((res: Response) => res));
  }

  deleteUser(userId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(`http://localhost:3000/users/${userId}`, {headers: headers})
      .pipe(map((res: User) => res));
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  loggedIn() {
    return !(new JwtHelperService().isTokenExpired(localStorage.getItem('id_token')));
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
