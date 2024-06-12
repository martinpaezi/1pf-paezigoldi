import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { StudentsService } from '../students.service';
import { StudentActions } from './student.actions';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
 export class StudentsEffects {
   loadStudents$ = createEffect(() => {
     return this.actions$.pipe(
       ofType(StudentActions.loadStudents),
       concatMap(() =>
         this.studentsService.getStudents().pipe(
           map((data) => StudentActions.loadStudentsSuccess({ data })),
           catchError((error) =>
             of(StudentActions.loadStudentsFailure({ error }))
           )
         )
       )
     );
   });

   createStudent$ = createEffect(() => {
     return this.actions$.pipe(
       ofType(StudentActions.createStudent),
       concatMap((action) =>
         this.studentsService.createStudent(action.payload).pipe(
           map((data) => StudentActions.createStudentSuccess({ data })),
           catchError((error) =>
             of(StudentActions.createStudentFailure({ error }))
           )
         )
       )
     );
   });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      concatMap((action) =>
        this.studentsService.updateStudent(action.id, action.payload).pipe(
          map((data) => StudentActions.updateStudentSuccess({ data })),
          catchError((error: HttpErrorResponse) =>
            of(StudentActions.updateStudentFailure({ error }))
          )
        )
      )
    );
  });

   deleteStudentById$ = createEffect(() => {
     return this.actions$.pipe(
       ofType(StudentActions.deleteStudentById),
       concatMap((action) =>
         this.studentsService.deleteStudentById(action.id).pipe(
           map((data) => StudentActions.deleteStudentByIdSuccess({ data })),
           catchError((error) =>
             of(StudentActions.deleteStudentByIdFailure({ error }))
           )
         )
       )
     );
   });

   onErrors$ = createEffect(
     () => {
       return this.actions$.pipe(
         ofType(
           StudentActions.loadStudentsFailure,
           StudentActions.createStudentFailure,
           StudentActions.updateStudentFailure,
           StudentActions.deleteStudentByIdFailure
         ),
         tap((action) => {
           if (action.error instanceof HttpErrorResponse) {
             Swal.fire({
               icon: 'error',
               text: action.error['message'],
             });
           }
         })
       );
     },
     { dispatch: false }
   );

   constructor(
     private actions$: Actions,
     private studentsService: StudentsService
   ) {}
 }
