import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourse } from '../models';

export const courseFeatureKey = 'courses';

export interface State {
  courses: ICourse[];
  isLoading: boolean;
  error: unknown;
}

 export const initialState: State = {
   courses: [],
   isLoading: false,
   error: null,
 };

 export const reducer = createReducer(
   initialState,

   on(CourseActions.loadCourses, (state) => {
     return {
       ...state,
       isLoading: true,
     };
   }),

   on(CourseActions.loadCoursesSuccess, (state, action) => {
     return {
       ...state,
       isLoading: false,
       courses: action.data,
     };
   }),

   on(CourseActions.loadCoursesFailure, (state, action) => {
     return {
       ...state,
       error: action.error,
       isLoading: false,
     };
   }),

   on(CourseActions.createCourse, (state) => {
     return {
       ...state,
       isLoading: true,
     };
   }),

   on(CourseActions.createCourseSuccess, (state, action) => {
     return {
       ...state,
       isLoading: false,
       courses: [...state.courses, action.data],
     };
   }),

   on(CourseActions.createCourseFailure, (state, action) => {
     return {
       ...state,
       isLoading: false,
       error: action.error,
     };
   }),

  on(CourseActions.updateCourse, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(CourseActions.updateCourseSuccess, (state, action) => {
    const updatedCourses = state.courses.map(course =>
      course.id === action.data.id ? action.data : course
    );
    return {
      ...state,
      isLoading: false,
      courses: updatedCourses,
    };
  }),

  on(CourseActions.updateCourseFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

   on(CourseActions.deleteCourseById, (state) => ({
     ...state,
     isLoading: true,
   })),

   on(CourseActions.deleteCourseByIdSuccess, (state, action) => ({
     ...state,
     isLoading: false,
     courses: state.courses.filter((course) => course.id !== action.data.id),
   })),

   on(CourseActions.deleteCourseByIdFailure, (state, action) => ({
     ...state,
     isLoading: false,
     error: action.error,
   }))
 );

 export const courseFeature = createFeature({
   name: courseFeatureKey,
   reducer,
 });