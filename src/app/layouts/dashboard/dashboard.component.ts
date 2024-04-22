import { Component, OnDestroy } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { IStudents } from './pages/students/models';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  showFiller: boolean = true;
  authUser$: Observable<IStudents | null>;
  filteredUsers$: Observable<IStudents[]> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private usersService: UsersService) {
    this.authUser$ = this.usersService.authUser$;

    this.usersService.getAllUsers().then(users => {
      this.filteredUsers$ = of(users).pipe(
        map(users => users.filter(user => user.firstName)),
        takeUntil(this.unsubscribe$)
      );
    });
  }

  login(): void {
    this.usersService.login();
  }

  filterUsers(filterText: string): void {
    this.usersService.getAllUsers().then(users => {
      this.filteredUsers$ = of(users).pipe(
        map(users => users.filter(user => user.firstName.toLowerCase().includes(filterText.toLowerCase()))),
        takeUntil(this.unsubscribe$)
      );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.usersService.authUser$.next(null);
  }

     isMobile(): boolean {
     return window.innerWidth <= 280;
   }

}