import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from 'src/app/services/validate.service';
import { Program, ProgramService } from '../../services/program.service'

interface WeekDay {
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.less']
})
export class EditProgramComponent implements OnInit {
  program: Program;
  isNew: boolean = true;
  mode: string;
  weekdays: WeekDay[] = [
    { name:"Sunday", checked: false },
    { name:"Monday", checked: false },
    { name:"Tuesday", checked: false },
    { name:"Wednesday", checked: false },
    { name:"Thursday", checked: false },
    { name:"Friday", checked: false },
    { name:"Saturday", checked: false }];

  constructor(
    private programService: ProgramService,
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private router: Router) {
      let navState: any = this.router.getCurrentNavigation();
      if (navState) {
        navState = navState.extras.state;
      }
      if (navState) {
        this.program = navState.program;
      }
      if (this.program) {
        this.initWeekdays();
        this.isNew = false;
        this.mode = "Edit";
      } else {
        this.program = {} as Program;
        this.mode = "Add";
      }
    }

  ngOnInit(): void {
  }

  onEditSubmit() {
    this.trimTextInputs();
    this.setWeekdays();
    this.setTimes();
    if (this.validateService.validateProgram(this.program)) {
      if (this.isNew) {
        this.programService.saveProgram(this.program).subscribe(res => {
            this.router.navigate(['/programs']);
          },
          error => {
            console.log(error);
            return false;
          });
      } else {
        this.programService.updateProgram(this.program).subscribe(res => {
            this.router.navigate(['/programs']);
          },
          error => {
            console.log(error);
            return false;
          });
      }
    } else {
      this.flashMessageService.show("Please enter a valid program configuration.", {cssClass: 'alert-danger'});
    }
  }
  
  onDeleteProgram() {
    this.programService.deleteProgram(this.program._id).subscribe(() => {
      this.router.navigate(['/programs']);
    },
    error => {
      console.log(error);
      return false;
    });
  }

  private trimTextInputs() {
    this.program.name = this.program.name.trim();
    this.program.location = this.program.location.trim();
    this.program.preRequisites = this.program.preRequisites.trim();
  }

  private initWeekdays() {
    for (let day of this.weekdays) {
      if (this.program.daysOfWeek.includes(day.name)) {
        day.checked = true;
      }
    }
  }

  private setWeekdays() {
    let newDays: string[] = [];
    for (let day of this.weekdays) {
      if (day.checked) {
        newDays.push(day.name);
      }
    }
    this.program.daysOfWeek = newDays;
  }

  private setTimes() {
    this.program.startTime = `1970-01-01T${this.program.startTime}:00.000Z`;
    this.program.endTime = `1970-01-01T${this.program.endTime}:00.000Z`;
  }
}
