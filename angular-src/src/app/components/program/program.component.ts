import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Program, ProgramService } from '../../services/program.service'

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.less']
})
export class ProgramComponent implements OnInit {
  program: Program;
  isNew: boolean = true;
  mode: string;
  weekdays: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private programService: ProgramService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let programId = this.route.snapshot.paramMap.get('id');
    if (programId) {
      this.programService.loadProgram(programId).subscribe(prog => {
        this.program = prog;
      });
      this.isNew = false;
      this.mode = "Edit";
    } else {
      this.program = {} as Program;
      this.mode = "Add";
    }
  }

  onEditSubmit() {
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
}
