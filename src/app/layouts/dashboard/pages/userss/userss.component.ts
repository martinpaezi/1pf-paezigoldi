import { Component, OnInit } from '@angular/core';
import { IUserss } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UserssDialogComponent } from './components/userss-dialog/userss-dialog.component';
import { Store } from '@ngrx/store';
import { UserActions, selectUsers, selectIsLoading, selectUsersError } from './store/index';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-userss',
  templateUrl: './userss.component.html',
  styleUrls: ['./userss.component.scss']
})
export class UserssComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fullName', 'email', 'course', 'role', 'createdAt', 'actions'];
  loading$: Observable<boolean>;
  users$: Observable<IUserss[]>;
  error$: Observable<HttpErrorResponse | null>;

  constructor(
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.loading$ = this.store.select(selectIsLoading);
    this.users$ = this.store.select(selectUsers);
    this.error$ = this.store.select(selectUsersError);
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
  }

  openDialog(editingUser?: IUserss): void {
    const dialogRef = this.matDialog.open(UserssDialogComponent, {
      data: editingUser ? { ...editingUser } : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editingUser) {
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
