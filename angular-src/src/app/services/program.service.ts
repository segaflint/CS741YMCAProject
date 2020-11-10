import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Program {
  _id: string;
  description: string;
  startDate: string;
  endDate: string;
  dayOfWeek: string;
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

  saveProgram(program) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post("http://localhost:3000/programs", program, {headers: headers})
      .pipe(map((res: Response) => res));
  }

  updateProgram(program) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.patch("http://localhost:3000/programs/" + program._id, program, {headers: headers})
      .pipe(map((res: Response) => res));
  }
}
