import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginData } from "../../layouts/auth/models";
import { IUserss } from "../../layouts/dashboard/pages/userss/models";

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ payload: LoginData }>(),
    loginSuccess: props<{ user: IUserss }>(),
    loginFailure: props<{ error: string }>(),
    logout: emptyProps(),
  }
});