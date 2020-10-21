import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  loadPrograms() {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get("http://localhost:3000/programs", {headers})
      .pipe(map((res: Response) => res));
  }

  loadProgram(programId) {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get("http://localhost:3000/programs/" + programId, {headers})
      .pipe(map((res: Response) => res));
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
