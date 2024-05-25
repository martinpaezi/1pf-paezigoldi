import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeature, AuthState } from "./auth.reducer";

export const authState = createFeatureSelector<AuthState>(authFeature);
export const authUser = createSelector(authState, (state) => state.authUser);
