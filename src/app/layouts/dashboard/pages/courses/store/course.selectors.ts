import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './course.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.error
);
