import { createReducer, on } from '@ngrx/store';
import { loadCourses, loadCoursesSuccess, loadCoursesFailure } from './course.actions';
import { ICourse } from '../models';

export interface CoursesState {
  courses: ICourse[];
  error: any;
}

export const initialState: CoursesState = {
  courses: [],
  error: null
};

export const coursesReducer = createReducer(
  initialState,
  on(loadCourses, state => ({ ...state })),
  on(loadCoursesSuccess, (state, { courses }) => ({ ...state, courses })),
  on(loadCoursesFailure, (state, { error }) => ({ ...state, error }))
);
