import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IStudents } from './pages/students/models';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  authUser$: Observable<IStudents | null>;
  private unsubscribe$ = new Subject<void>();

  constructor(private usersService: UsersService)
   // private router: Router) 
   {
    this.authUser$ = this.usersService.authUser$;
  }

  ngOnInit(): void {
    this.authUser$.subscribe(user => console.log("Usuario autenticado:", user));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
   // this.router.navigate(['/auth']);
  }

     showFiller: boolean = true;

      isMobile(): boolean {
      return window.innerWidth <= 280;
    }
}
