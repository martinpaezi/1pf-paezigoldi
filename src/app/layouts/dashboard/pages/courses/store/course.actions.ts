import { createAction, props } from '@ngrx/store';
import { ICourse } from '../models';

export const loadCourses = createAction('[Courses] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: ICourse[] }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Courses] Delete Course Success',
  props<{ id: number }>()
);

export const deleteCourseFailure = createAction(
  '[Courses] Delete Course Failure',
  props<{ error: any }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ id: number, changes: Partial<ICourse> }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: ICourse }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: any }>()
);
