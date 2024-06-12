import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { IUserss } from './pages/userss/models';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../../core/services/title.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  authUser$: Observable<IUserss | null>;
  private unsubscribe$ = new Subject<void>();
  currentUser: IUserss | null = null;

  title$: Observable<string>;

  constructor(private usersService: UsersService, private router: Router, private titleService: TitleService,  private cdr: ChangeDetectorRef )
   {
    this.authUser$ = this.usersService.authUser$;
    this.title$ = this.titleService.title$;
}

  ngOnInit(): void {
    this.currentUser = this.usersService.getAuthenticatedUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }    this.title$.subscribe(() => {
      this.cdr.detectChanges();
    });
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
