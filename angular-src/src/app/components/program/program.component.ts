import { Component, Input, OnInit } from '@angular/core';
import { Registration, Program, ProgramService } from 'src/app/services/program.service';
import { User, AuthService } from '../../services/auth.service'
import { ValidateService } from '../../services/validate.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.less']
})
export class ProgramComponent implements OnInit {
  @Input('program') program: Program;
  @Input('user') user: User;
  registrations: Registration[];

  userRegistration: Registration = undefined;
  registered: boolean = false;

  errorMsg: string = undefined;

  constructor(
    private programService: ProgramService,
    private validateService: ValidateService) { }

  ngOnInit(): void {
    this.program.startTime = this.convertMilitaryto12Hr(this.program.startTime);
    this.program.endTime = this.convertMilitaryto12Hr(this.program.endTime);
    this.programService.loadRegistrationsByProgram(this.program._id).subscribe((registrations: Registration[]) => {
      this.registrations = registrations;
      this.userRegistration = this.registrations.find(registration => registration.userId === this.user._id);
      this.registered = !!this.userRegistration;
    },
    error => {
      console.log(error);
      return false;
    });
  }

  onClickRegister() {
    if (this.userRegistration) {
      this.programService.deleteRegistration(this.userRegistration._id).subscribe(() => {
        this.registrations.splice(this.registrations.indexOf(this.userRegistration), 1);
        this.userRegistration = undefined;
        this.registered = false;
      },
      error => {
        console.log(error);
        return false;
      });
    } else if (this.program.capacity === this.registrations.length) {
     this.programErrorMessage(`Program '${this.program.name}' is at capacity`);
    } else if (this.validateService.validateProgramRegistration(this.user, this.program)) {
      let newRegistration: Registration = {} as Registration;
      newRegistration.userId = this.user._id;
      newRegistration.programId = this.program._id;
      newRegistration.username = this.user.username;
      newRegistration.programName = this.program.name;

      this.programService.enrollUserInProgram(newRegistration).subscribe((registration: Registration) => {
        this.registrations.push(registration);
        this.userRegistration = registration;
        this.registered = true;
      },
      error => {
        console.log(error);
        return false;
      });
    } else {
      this.programErrorMessage(`Program '${this.program.name}' conflicts with another registration`)
    }
  }

  private programErrorMessage(msg: string) {
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorMsg = undefined;
    }, 2000);
  }

  private convertMilitaryto12Hr(time: string) {
    let hr: number = parseInt(time);
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
