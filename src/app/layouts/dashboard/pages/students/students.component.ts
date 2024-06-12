import { Component, OnInit } from '@angular/core';
import { IStudents } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import {
  selectIsLoading,
  selectStudent,
  selectStudentError,
  selectStudentState,
} from './store/student.selectors';
import { StudentsService } from './students.service';
import { MatTableDataSource } from '@angular/material/table';
import { StudentActions } from './store/student.actions';
import { TitleService } from '../../../../core/services/title.service';
import { IUserss } from '../userss/models';
import { UsersService } from '../../../../core/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent implements OnInit {
  dataSource = new MatTableDataSource<IStudents>([]);
  displayedColumns = ['id', 'fullName', 'email', 'course', 'role', 'createdAt', 'actions'];
  students$: Observable<IStudents[]>
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;
  currentUser: IUserss | null = null;
  authUser$: Observable<IUserss | null>;

  constructor( 
    private usersService: UsersService, 
    private router: Router,
    private matDialog: MatDialog, 
    private studentssService: StudentsService, 
    private store: Store, 
    private titleService: TitleService) {
      this.isLoading$ = this.store.select(selectIsLoading);
      this.students$ = this.store.select(selectStudent);
      this.error$ = this.store.select(selectStudentError)
       .pipe(map((err) => err as Error));
       this.authUser$ = this.usersService.authUser$;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setTitle('Alumnos');
    }); 
      this.store.dispatch(StudentActions.loadStudents());
      this.currentUser = this.usersService.getAuthenticatedUser();
    if (!this.currentUser) {
      this.router.navigate(['/auth']);
    }
      this.error$.subscribe((error) => {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Unknown error',
        });
      }
    });
  };
  openDialog(editingStudent?: IStudents): void {
     const dialogRef = this.matDialog.open(StudentsDialogComponent, {
       data: editingStudent ? { ...editingStudent } : null,
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         if (editingStudent) {
           result.createdAt = editingStudent.createdAt;
           this.updateStudent(editingStudent.id, result);
         } else {
           this.createStudent(result);
         }
       }
     });
   };

     createStudent(student: IStudents): void {
      student.createdAt = new Date();
      this.store.dispatch(
       StudentActions.createStudent({ payload:student }));
   }

  updateStudent(id: number, student: IStudents): void {
    this.store.dispatch(StudentActions.updateStudent({ id, payload: student }));
  }

  onDelete(id: string): void {
    Swal.fire({
      icon: 'question',
      html: `Esta seguro?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(StudentActions.deleteStudentById({ id }));
      }
    });
}
}


