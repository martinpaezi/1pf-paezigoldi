import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IStudents } from '../models';
import * as StudentActions from './student.actions';

export interface StudentState extends EntityState<IStudents> {}

export const studentAdapter = createEntityAdapter<IStudents>();

const initialState: StudentState = studentAdapter.getInitialState();

const studentReducer = createReducer(
  initialState,
  on(StudentActions.addStudent, (state, { student }) => studentAdapter.addOne(student, state)),
  on(StudentActions.updateStudent, (state, { id, changes }) => studentAdapter.updateOne({ id, changes }, state)),
  on(StudentActions.deleteStudent, (state, { id }) => studentAdapter.removeOne(id, state))
);

export function reducer(state: StudentState | undefined, action: Action) {
  return studentReducer(state, action);
}
