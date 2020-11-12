import { Injectable } from '@angular/core';
import { User } from './auth.service';
import { Program } from './program.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined || user.username == undefined || user.password == undefined) {
      return false;
    }
    return true;
  }

  validateProgramRegistration(user: User, program: Program): boolean {
    return true;
  }
}
