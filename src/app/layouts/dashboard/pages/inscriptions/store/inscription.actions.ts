import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: any[] }>(),
    'Load Inscriptions Failure': props<{ error: any }>(),
  }
});
