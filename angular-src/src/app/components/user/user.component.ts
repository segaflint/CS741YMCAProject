import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { Registration, RegistrationService } from 'src/app/services/registration.service';
import { Program, ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  @Input('user') user: User;
  curUser: User;
  isProfile: boolean;
  registrations: Registration[] = [];
  programs: Program[] = [];

  @Output('userDeleted') userDeleted: EventEmitter<User> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private registrationService: RegistrationService,
    private programService: ProgramService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      if (!this.user) {
        this.user = user;
        this.isProfile = true;
        this.loadRegistrations(user);
      }
      this.curUser = user;
    },
    error => {
      console.log(error);
      return false;
    });
    if (this.user) {
      this.loadRegistrations(this.user);
    }
  }

  loadRegistrations(user: User) {
    this.registrationService.loadRegistrationsByUser(user._id).subscribe((registrations: Registration[]) => {
      this.registrations = registrations ? registrations : [];
    },
    error => {
      console.log(error);
      return false;
    });
    this.programService.loadProgramsByUser(user._id).subscribe((programs: Program[]) => {
      this.programs = programs ? programs : [];
    },
    error => {
      console.log(error);
      return false;
    });
  }

  getProgramInfo(programId: string) {
    let program: Program = this.programs.filter(prog => prog._id === programId)[0];
    if (program)
      return `- ${this.programService.convertMilitaryto12Hr(program.startTime)} - ${program.daysOfWeek}`;
    return "";
  }

  onclickDeleteRegistration(registration: Registration) {
    this.registrationService.deleteRegistration(registration._id).subscribe(() => {
      this.registrations.splice(this.registrations.indexOf(registration), 1);
    },
    error => {
      console.log(error);
      return false;
    });
  }

  onClickDeleteUser() {
    this.authService.deleteUser(this.user._id).subscribe(() => {
      this.userDeleted.emit(this.user);
    },
    error => {
      console.log(error);
      return false;
    }); 
  }

  toggleMembership() {
    this.authService.updateUser(this.user).subscribe(() => { },
    error => {
      console.log(error);
      return false;
    });
  }
}
