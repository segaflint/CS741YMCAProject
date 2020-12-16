/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: This code is responsible for validation of registering users and programs.
*/
import { Injectable } from '@angular/core';
import { User } from './auth.service';
import { Program } from './program.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: User): Boolean {
    if (user.name == undefined || user.username == undefined || user.password == undefined) {
      return false;
    }
    return true;
  }

  validateProgram(program: Program): Boolean {
    if ((Object.values(program).length === 10 && program.preRequisites !== undefined)
      || Object.values(program).length < 10 || program.daysOfWeek.length === 0
      || program.startDate.includes("undefined") || program.endDate.includes("undefined")
      || program.startTime.includes("undefined") || program.endTime.includes("undefined")
      || new Date(program.startDate) > new Date(program.endDate)
      || new Date(program.startTime) > new Date(program.endTime))
      return false;
    return true;
  }
}
