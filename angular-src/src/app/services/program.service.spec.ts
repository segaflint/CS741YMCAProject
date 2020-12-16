/*
Authors: Connor Ludwigson & Seth Rasmusson
Code: Test file for the program service.
*/
import { TestBed } from '@angular/core/testing';

import { ProgramService } from './program.service';

describe('ProgramService', () => {
  let service: ProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
