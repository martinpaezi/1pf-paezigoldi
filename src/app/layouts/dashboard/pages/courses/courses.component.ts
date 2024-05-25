import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICourse } from './models';
import { loadCourses, deleteCourse, updateCourse } from './store/course.actions';
import { selectAllCourses, selectCoursesError } from './store/course.selectors';
import { CoursesState } from './store/course.reducer';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  dataSource = new MatTableDataSource<ICourse>([]);
  error$: Observable<any> | undefined;

  constructor(private store: Store<{ courses: CoursesState }>) {}

  ngOnInit(): void {
    this.store.select(selectAllCourses).subscribe(courses => {
      if (courses) {
        this.dataSource.data = courses;
        console.log('Courses loaded:', courses);
      }
    });
    this.error$ = this.store.select(selectCoursesError);
    this.store.dispatch(loadCourses());
  }

  deleteCourse(id: number): void {
    this.store.dispatch(deleteCourse({ id }));
  }

  updateCourse(id: number, changes: Partial<ICourse>): void {
    this.store.dispatch(updateCourse({ id, changes }));
  }
}
