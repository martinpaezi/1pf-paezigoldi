import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IStudents } from './pages/students/models';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  authUser$: Observable<IStudents | null>;
  private unsubscribe$ = new Subject<void>();
  currentUser!: IStudents;


  constructor(private usersService: UsersService)
   {
    this.authUser$ = this.usersService.authUser$;
  }

  ngOnInit(): void {
    this.authUser$.subscribe(user => console.log("Usuario autenticado:", user));
    this.currentUser = this.usersService.getAuthenticatedUser();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

     showFiller: boolean = true;

      isMobile(): boolean {
      return window.innerWidth <= 280;
    }
}
