import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { IStudents } from "../../layouts/dashboard/pages/students/models";

export interface AuthState {
  authUser: null | IStudents;
}

const initialState: AuthState = {
  authUser: null,
};

const MOCK_AUTH_USER: IStudents = {
  id: 1,
  createdAt: new Date(),
  email: 'email@mail.com',
  firstName: 'martin',
  lastName: 'paez',
  role: 'ADMIN',
  fullName: "",
  course: ""
};

export const authFeature = 'auth';

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state, action) => {
    if (
      action.payload.email !== 'martin@mail.com' ||
      action.payload.password !== '123456'
    ) {
      alert('Correo o password incorrectos');
      return state;
    } else {
      localStorage.setItem('accessToken', 'fdskfdsjkmngfunudsijfdsioufjsdoifdsyhfds');
      return {
        ...state,
        authUser: MOCK_AUTH_USER,
      };
    }
  }),
  on(authActions.logout, () => {
    localStorage.removeItem('accessToken');
    return initialState;
  })
);
