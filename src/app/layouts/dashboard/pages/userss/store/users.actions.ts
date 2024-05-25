import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUserss } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: IUserss[] }>(),
    'Load Users Failure': props<{ error: HttpErrorResponse }>(),

    'Create User': props<{ payload: IUserss }>(),
    'Create User Success': props<{ data: IUserss }>(),
    'Create User Failure': props<{ error: HttpErrorResponse }>(),

    'Update User': props<{ id: number, payload: IUserss }>(),
    'Update User Success': props<{ data: IUserss }>(),
    'Update User Failure': props<{ error: HttpErrorResponse }>(),

    'Delete User By Id': props<{ id: number }>(),
    'Delete User By Id Success': props<{ id: number }>(),
    'Delete User By Id Failure': props<{ error: HttpErrorResponse }>(),
  },
});
