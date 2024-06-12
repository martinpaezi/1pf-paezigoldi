import { createFeature, createReducer, on, Action } from '@ngrx/store';
import { IStudents } from '../models';
import { StudentActions } from './student.actions';

export const studentFeatureKey = 'students';

 export interface State {
   students: IStudents[];
   isLoading: boolean;
   error: unknown;
 }

  export const initialState: State = {
    students: [],
    isLoading: false,
    error: null,
  };

  export const reducer = createReducer(
    initialState,

    on(StudentActions.loadStudents, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),

    on(StudentActions.loadStudentsSuccess, (state, action) => {
      return {
        ...state,
        isLoading: false,
        students: action.data,
      };
    }),

    on(StudentActions.loadStudentsFailure, (state, action) => {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }),

    on(StudentActions.createStudent, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }),

    on(StudentActions.createStudentSuccess, (state, action) => {
      return {
        ...state,
        isLoading: false,
        student: [...state.students, action.data],
      };
    }),
    on(StudentActions.createStudentFailure, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }),

  on(StudentActions.updateStudent, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(StudentActions.updateStudentSuccess, (state, action) => {
    const updatedStudents = state.students.map(student =>
      student.id === action.data.id ? action.data : student
    );
    return {
      ...state,
      isLoading: false,
      users: updatedStudents,
    };
  }),

  on(StudentActions.updateStudentFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

    on(StudentActions.deleteStudentById, (state) => ({
      ...state,
      isLoading: true,
    })),

    on(StudentActions.deleteStudentByIdSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      students: state.students.filter((student) => student.id !== action.data.id),
    })),

    on(StudentActions.deleteStudentByIdFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }))
  );

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});