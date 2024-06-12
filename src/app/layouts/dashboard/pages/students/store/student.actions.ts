import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IStudents, ICreateStudentPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: IStudents[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Create Student': props<{ payload: ICreateStudentPayload }>(),
    'Create Student Success': props<{ data: IStudents }>(),
    'Create Student Failure': props<{ error: unknown }>(),

    'Update Student': props<{  id: number ,payload: IStudents }>(),
    'Update Student Success': props<{ data: IStudents }>(),
    'Update Student Failure': props<{ error: unknown }>(),
//                                number o string?
    'Delete Student By Id': props<{ id: string }>(),
    'Delete Student By Id Success': props<{ data: IStudents }>(),
    'Delete Student By Id Failure': props<{ error: HttpErrorResponse }>(),
  },
});