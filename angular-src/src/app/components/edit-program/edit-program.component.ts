import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let programId = this.route.snapshot.paramMap.get('id');
    if (programId) {
      this.programService.loadProgram(programId).subscribe((prog: Program) => {
        this.program = prog;
        this.initWeekdays();
      });
      this.isNew = false;
      this.mode = "Edit";
    } else {
      this.program = {} as Program;
      this.mode = "Add";
    }
  }

  onEditSubmit() {
    this.setWeekdays();
    this.setTimes();
    if (this.isNew) {
      this.programService.saveProgram(this.program).subscribe(res => { },
        error => {
          console.log(error);
          return false;
        });
    } else {
      this.programService.updateProgram(this.program).subscribe(res => { },
        error => {
          console.log(error);
          return false;
        });
    }
    this.router.navigate(['/programs']);
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

  private initWeekdays() {
    for (let day of this.weekdays) {
      if (this.program.daysOfWeek.includes(day.name)) {
        day.checked = true;
      }
    }
    console.log(this.weekdays);
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
