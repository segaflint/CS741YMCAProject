/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: Service responsible for user registrations to programs with the backend.
*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Registration {
  _id: string;
  userId: string;
  programId: string;
  username: string;
  programName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  loadRegistrations() {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get("http://localhost:3000/registrations", {headers})
      .pipe(map((res: Registration[]) => res));
  }

  loadRegistrationsByProgram(programId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`http://localhost:3000/registrations/program/${programId}`, {headers})
      .pipe(map((res: Registration[]) => res));
  }

  loadRegistrationsByUser(userId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`http://localhost:3000/registrations/user/${userId}`, {headers})
      .pipe(map((res: Registration[]) => res));
  }

  enrollUserInProgram(registration) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:3000/registrations", registration, {headers: headers})
      .pipe(map((res: Registration) => res));
  }

  deleteRegistration(registrationId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(`http://localhost:3000/registrations/${registrationId}`, {headers: headers})
      .pipe(map((res: Registration) => res));
  }
}
