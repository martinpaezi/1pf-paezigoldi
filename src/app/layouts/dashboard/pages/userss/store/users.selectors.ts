import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './users.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);

export const selectUsersError = createSelector(
  selectUserState,
  (state) => state.error
);
