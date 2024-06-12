import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { IUserss } from "../../layouts/dashboard/pages/userss/models";

export interface AuthState {
  authUser: IUserss | null;
  error: string | null;
}

const initialState: AuthState = {
  authUser: null,
  error: null,
};

export const authFeatureKey = 'auth';

export const authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, action) => ({
    ...state,
    authUser: action.user,
    error: null,
  })),
  on(authActions.loginFailure, (state, action) => ({
    ...state,
    authUser: null,
    error: action.error,
  })),
  on(authActions.logout, () => initialState)
);
