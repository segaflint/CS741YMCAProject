import { Component, OnInit } from '@angular/core';
import { Program, ProgramService } from '../../services/program.service'
import { User, AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.less']
})
export class ProgramsComponent implements OnInit {
  programs: Program[];
  displayPrograms: Program[];
  user: User;
  query: string = "";

  constructor(
    private programService: ProgramService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      this.user = user;
    },
    error => {
      console.log(error);
      return false;
    });
    this.programService.loadPrograms().subscribe((programs: Program[]) => {
      this.programs = programs;
      this.displayPrograms = programs;
    },
    error => {
      console.log(error);
      return false;
    });
  }

  queryKeyDown(event) {
    if (event.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.query = this.query.trim();
    if (!this.query || this.query === "") {
      this.displayPrograms = this.programs;
    } else {
      this.displayPrograms = this.programs.filter(prog => {
        return prog.name.toLowerCase().includes(this.query.toLowerCase());
      });
    }
  }
}
