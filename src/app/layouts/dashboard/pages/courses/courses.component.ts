import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ICourse } from './models';
import Swal from 'sweetalert2';
import {
  selectIsLoading,
  selectCourse,
  selectCourseError,
  selectCourseState,
} from './store/course.selectors';
import { CoursesService } from './courses.service';
import { CourseActions } from './store/course.actions';
import { MatTableDataSource } from '@angular/material/table';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserss } from '../userss/models';
import { UsersService } from '../../../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  dataSource = new MatTableDataSource<ICourse>([]);

  displayedColumns = ['id', 'course', 'students', 'createdAt', 'actions'];
  courses$: Observable<ICourse[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<Error>;
  currentUser: IUserss | null = null;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog, 
    private usersService: UsersService,
    private router: Router,
    private store: Store, 
    private titleService: TitleService) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.courses$ = this.store.select(selectCourse);
    this.error$ = this.store
      .select(selectCourseError)
      .pipe(map((err) => err as Error));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setTitle('Cursos');
    });
      this.store.dispatch(CourseActions.loadCourses());
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
        }}
    )
}

   openDialog(editingCourse?: ICourse): void {
     const dialogRef = this.matDialog.open(CoursesDialogComponent, {
       data: editingCourse ? { ...editingCourse } : null,
     });
     dialogRef.afterClosed().subscribe(result => {
       if (result) {
         if (editingCourse) {
           result.createdAt = editingCourse.createdAt;
           this.updateCourse(editingCourse.id, result);
         } else {
           this.createCourse(result);
         }
       }
     });
   }

  createCourse(course: ICourse): void {
    course.createdAt = new Date();
    this.store.dispatch(
      CourseActions.createCourse({ payload: course })
    );
  }

  updateCourse(id: number, course: ICourse): void {
    this.store.dispatch(CourseActions.updateCourse({ id, payload: course }));
  }

  onDelete(id: number): void {
    Swal.fire({
      icon: 'question',
      html: `Esta seguro?`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CourseActions.deleteCourseById({ id }));
      }
    });
  }
}
