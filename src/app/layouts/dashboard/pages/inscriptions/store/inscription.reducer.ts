import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { IInscription } from '../models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  loading: boolean;
  inscriptions: IInscription[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  inscriptions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, (state) => { return { 
    ...state, 
    loading: true };}),

  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => { return {
    ...state, 
    inscriptions: action.data, 
    loading: false};}),

  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state, 
      error: action.error, 
      loading: false,
    };
  }),

  on(InscriptionActions.createInscription, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(InscriptionActions.createInscriptionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: [...state.inscriptions, action.data],
  })),

  on(InscriptionActions.createInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InscriptionActions.updateInscription, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(InscriptionActions.updateInscriptionSuccess, (state, action) => {
    const updatedInscriptions = state.inscriptions.map(inscription =>
      inscription.id === action.data.id ? action.data : inscription
    );
    return {
      ...state,
      isLoading: false,
      inscriptions: updatedInscriptions,
    };
  }),

  on(InscriptionActions.updateInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(InscriptionActions.deleteInscriptionById, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(InscriptionActions.deleteInscriptionByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: state.inscriptions.filter(inscription => inscription.id !== Number(action.id)),
  })),

  on(InscriptionActions.deleteInscriptionByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
)
  
export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});