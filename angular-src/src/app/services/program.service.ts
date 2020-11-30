import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Program {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  location: string;
  memberPrice: number;
  nonMemberPrice: number;
  capacity: number;
  preRequisites: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  loadPrograms() {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get("http://localhost:3000/programs", {headers})
      .pipe(map((res: Program[]) => res));
  }

  loadProgram(programId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get("http://localhost:3000/programs/" + programId, {headers})
      .pipe(map((res: Program) => res));
  }

  loadProgramConflicts(userId: string, programId: string) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`http://localhost:3000/programs/conflicts/${userId}/${programId}`, {headers})
      .pipe(map((res: Program[]) => res));
  }

  loadProgramsByUser(userId: string) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`http://localhost:3000/programs/user/${userId}`, {headers})
      .pipe(map((res: Program[]) => res));
  }

  saveProgram(program) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:3000/programs", program, {headers: headers})
      .pipe(map((res: Program) => res));
  }

  updateProgram(program) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch(`http://localhost:3000/programs/${program._id}`, program, {headers: headers})
      .pipe(map((res: Response) => res));
  }

  deleteProgram(programId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete(`http://localhost:3000/programs/${programId}`, {headers: headers})
      .pipe(map((res: Program) => res));
  }

  convertMilitaryto12Hr(time: string) {
    let hr: number = parseInt(time.substring(11,13));
    let min: string = time.substring(13,16);
    let half: string;
    if (hr > 12) {
      hr -= 12;
      half = " PM";
    } else {
      half = " AM";
    }
    return hr + min + half;
  }
}
