import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IStudents } from '../dashboard/pages/students/models';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  authUser$: Observable<IStudents | null>;

  private unsubscribe$ = new Subject<void>();
 
  constructor(private usersService: UsersService,
              private router: Router) {
    this.authUser$ = this.usersService.authUser$;
  }

  ngOnInit(): void {
  }

  login(): void {
    this.usersService.login();
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.router.navigate(['/dashboard']);
  }
}
