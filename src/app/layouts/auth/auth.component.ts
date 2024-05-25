import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IStudents } from '../dashboard/pages/students/models';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  authUser$: Observable<IStudents | null>;
  loginForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authUser$ = this.usersService.authUser$;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const { email, password } = this.loginForm.getRawValue();
      this.usersService.login(email, password);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
