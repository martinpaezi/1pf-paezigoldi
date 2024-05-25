import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState, studentAdapter } from './student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('students');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = studentAdapter.getSelectors();

export const selectStudentIds = selectIds;
export const selectStudentEntities = selectEntities;
export const selectAllStudents = selectAll;
export const selectStudentTotal = selectTotal;

export const selectStudentById = (id: number) =>
  createSelector(selectStudentEntities, (students) => students[id]);
