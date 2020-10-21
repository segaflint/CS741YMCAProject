import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.less']
})
export class ProgramsComponent implements OnInit {
  programs: Array<any>;
  user: any;

  constructor(
    private programService: ProgramService,
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
    this.programService.loadPrograms().subscribe(programs => {
      this.programs = (<any>programs);
    },
    error => {
      console.log(error);
      return false;
    });
  }
}
