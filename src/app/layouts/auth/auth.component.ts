import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUserss } from '../dashboard/pages/userss/models';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth/auth.actions';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  authUser$: Observable<IUserss | null>;
  loginForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>
  ) {
    this.authUser$ = this.usersService.authUser$;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authUser$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      if (user) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const { email, password } = this.loginForm.getRawValue();
      this.usersService.login(email, password).subscribe(user => {
        if (user) {
          this.store.dispatch(authActions.loginSuccess({ user }));
        } else {
          this.store.dispatch(authActions.loginFailure({ error: 'Correo o password incorrectos' }));
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
