import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './users.actions';
import { IUserss } from '../models';

export const userFeatureKey = 'users';

export interface State {
  users: IUserss[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  users: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => {
    return {
    ...state,
    isLoading: true,
    };
  }),

  on(UserActions.loadUsersSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: action.data,
  })),

  on(UserActions.loadUsersFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(UserActions.createUser, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.createUserSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: [...state.users, action.data],
  })),

  on(UserActions.createUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(UserActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.updateUserSuccess, (state, action) => {
    const updatedUsers = state.users.map(user =>
      user.id === action.data.id ? action.data : user
    );
    return {
      ...state,
      isLoading: false,
      users: updatedUsers,
    };
  }),

  on(UserActions.updateUserFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(UserActions.deleteUserById, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(UserActions.deleteUserByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    users: state.users.filter(user => user.id !== action.data.id),
  })),

  on(UserActions.deleteUserByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
)

export const userFeature = createFeature({ name: userFeatureKey, reducer });
