import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IInscription, ICreateInscriptionPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: IInscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Create Inscription': props<{ payload: ICreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: IInscription }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),

    'Update Inscription': props<{  id: number ,payload: IInscription }>(),
    'Update Inscription Success': props<{ data: IInscription }>(),
    'Update Inscription Failure': props<{ error: unknown }>(),

    'Delete Inscription By Id': props<{ id: string }>(),
    'Delete Inscription By Id Success': props<{ id: string }>(),
    'Delete Inscription By Id Failure': props<{ error: HttpErrorResponse }>(),
  }
});