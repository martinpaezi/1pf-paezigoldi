import { ActionReducerMap } from "@ngrx/store";
import { authReducer, authFeature, AuthState } from "./auth/auth.reducer";

export interface RootState {
  [authFeature]: AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  [authFeature]: authReducer,
};
