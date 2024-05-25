import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from './users.actions';
import { UserssService } from '../userss.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.userssService.getUserss().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError((error: HttpErrorResponse) => of(UserActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      concatMap((action) =>
        this.userssService.createUser(action.payload).pipe(
          map((data) => UserActions.createUserSuccess({ data })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.createUserFailure({ error }))
          )
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      concatMap((action) =>
        this.userssService.updateUser(action.id, action.payload).pipe(
          map((data) => UserActions.updateUserSuccess({ data })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.updateUserFailure({ error }))
          )
        )
      )
    );
  });

  deleteUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUserById),
      concatMap((action) =>
        this.userssService.deleteUser(action.id).pipe(
          map(() => UserActions.deleteUserByIdSuccess({ id: action.id })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.deleteUserByIdFailure({ error }))
          )
        )
      )
    );
  });

  onErrors$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          UserActions.loadUsersFailure,
          UserActions.createUserFailure,
          UserActions.updateUserFailure,
          UserActions.deleteUserByIdFailure
        ),
        tap((action) => {
          if (action.error instanceof HttpErrorResponse) {
            Swal.fire({
              icon: 'error',
              text: action.error.message,
            });
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userssService: UserssService
  ) {}
}
