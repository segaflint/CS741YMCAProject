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
      (<any>programs).forEach(program => {
        program.startTime = this.convertMilitaryto12Hr(program.startTime);
        program.endTime = this.convertMilitaryto12Hr(program.endTime);
      });
    },
    error => {
      console.log(error);
      return false;
    });
  }
  
  private convertMilitaryto12Hr(time: string) {
    let hr: number= parseInt(time);
    let min: string = time.substring(2);
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