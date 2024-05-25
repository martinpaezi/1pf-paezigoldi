import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectLoading = createSelector(
  selectInscriptionState,
  (state: fromInscription.State) => state.loading
);

export const selectInscriptions = createSelector(
  selectInscriptionState,
  (state: fromInscription.State) => state.data
);

export const selectError = createSelector(
  selectInscriptionState,
  (state: fromInscription.State) => state.error
);
