import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  loading: boolean;
  data: any[];
  error: any;
}

export const initialState: State = {
  loading: false,
  data: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, state => ({ ...state, loading: true })),
  on(InscriptionActions.loadInscriptionsSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(InscriptionActions.loadInscriptionsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});
