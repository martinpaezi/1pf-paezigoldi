import { Component, OnInit } from '@angular/core';
import { IUserss } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserssDialogComponent } from './components/userss-dialog/userss-dialog.component';
import { Store } from '@ngrx/store';
import { UserActions } from './store/users.actions';
import Swal from 'sweetalert2';
import { Observable, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
  selectIsLoading,
  selectUsers,
  selectUsersError,
  selectUserState
} from './store/users.selectors';
import { UserssService } from './userss.service';
import { MatTableDataSource } from '@angular/material/table';
import { TitleService } from '../../../../core/services/title.service';

@Component({
  selector: 'app-userss',
  templateUrl: './userss.component.html',
  styleUrls: ['./userss.component.scss']
})
export class UserssComponent implements OnInit {
  dataSouce = new MatTableDataSource<IUserss>([]);

  displayedColumns = ['id', 'fullName', 'email', 'password', 'role', 'createdAt', 'actions'];
  loading$: Observable<boolean>;
  users$: Observable<IUserss[]>;
  error$: Observable<Error>;

  constructor(
    private userssService: UserssService,
    private matDialog: MatDialog,
    private store: Store,
    private titleService: TitleService
  ) {
    this.loading$ = this.store.select(selectIsLoading);
    this.users$ = this.store.select(selectUsers);
    this.error$ = this.store.select(selectUsersError).pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers());
    this.error$.subscribe((error) => {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Unknown error',
        });
      }
    });
    setTimeout(() => {
      this.titleService.setTitle('Usuarios');
    });
  }
 
   openDialog(editingUser?: IUserss): void {
     const dialogRef = this.matDialog.open(UserssDialogComponent, {
       data: editingUser ? { ...editingUser } : null,
     });

     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         if (editingUser) {
           result.createdAt = editingUser.createdAt;
           this.updateUser(editingUser.id, result);
         } else {
           this.createUser(result);
         }
       }
     });
   }

  createUser(user: IUserss): void {
    user.createdAt = new Date();
    this.store.dispatch(UserActions.createUser({ payload: user }));
  }

  updateUser(id: number, user: IUserss): void {
    this.store.dispatch(UserActions.updateUser({ id, payload: user }));
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro que deseas eliminarlo?')) {
      this.store.dispatch(UserActions.deleteUserById({ id }));
    }
  }
}
