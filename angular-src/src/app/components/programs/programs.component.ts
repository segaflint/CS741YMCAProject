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
  user: User;

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
    },
    error => {
      console.log(error);
      return false;
    });
  }
}
