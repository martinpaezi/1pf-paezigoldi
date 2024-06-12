import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUserss, ICreateUserPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: IUserss[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Create User': props<{ payload: ICreateUserPayload }>(),
    'Create User Success': props<{ data: IUserss }>(),
    'Create User Failure': props<{ error: unknown }>(),

    'Update User': props<{  id: number ,payload: IUserss }>(),
    'Update User Success': props<{ data: IUserss }>(),
    'Update User Failure': props<{ error: unknown }>(),

    'Delete User By Id': props<{ id: number }>(),
    'Delete User By Id Success': props<{ data: IUserss }>(),
    'Delete User By Id Failure': props<{ error: HttpErrorResponse }>(),
  },
});
