import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { IStudents } from '../students/models';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnDestroy {

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
    this.usersService._authUser$.next(null);
  }

}
