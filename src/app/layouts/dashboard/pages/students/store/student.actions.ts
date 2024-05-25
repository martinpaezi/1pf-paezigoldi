import { createAction, props } from '@ngrx/store';
import { IStudents } from '../models';


export const addStudent = createAction('[Student] Add Student', props<{ student: IStudents }>());
export const updateStudent = createAction('[Student] Update Student', props<{ id: number, changes: Partial<IStudents> }>());
export const deleteStudent = createAction('[Student] Delete Student', props<{ id: number }>());
