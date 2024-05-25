import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { StudentsService } from '../students.service';
import * as StudentActions from './student.actions';

@Injectable()
export class StudentEffects {
  
  loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType('[Student] Load Students'),
    mergeMap(() => this.studentsService.getStudents()
      .pipe(
        map(students => ({ type: '[Student] Load Students Success', payload: students })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) {}
}
