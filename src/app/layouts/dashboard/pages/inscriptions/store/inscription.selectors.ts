import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectIsLoading = createSelector(
  selectInscriptionState,
  (state) => state.loading
);

export const selectInscription = createSelector(selectInscriptionState, (s) => s.inscriptions);

export const selectInscriptionError = createSelector(
  selectInscriptionState,
  (state) => state.error
  );