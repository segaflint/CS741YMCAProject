/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: test file for edit-program
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramComponent } from './edit-program.component';

describe('ProgramComponent', () => {
  let component: EditProgramComponent;
  let fixture: ComponentFixture<EditProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
