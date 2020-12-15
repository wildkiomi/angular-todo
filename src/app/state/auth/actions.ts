import { createAction, props } from '@ngrx/store';

export enum AuthActions {
  logIn = '[Auth Component] Log In',
  logInSuccess = '[Auth API] Log In Success',
  signUp = '[Auth Component] Sign Up',
  logOut = '[Auth Component] Log Out',
  logOutSuccess = '[Auth Component] Log Out Success',
}

export const logIn = createAction(
  AuthActions.logIn,
  props<{ payload: { email: string, password: string }}>()
);

export const signUp = createAction(
  AuthActions.signUp,
  props<{ payload: { email: string, password: string }}>()
);

export const logInSuccess = createAction(
  AuthActions.logInSuccess,
  props<{ payload: {} }>()
);

export const logOut = createAction(AuthActions.logOut);

export const logOutSuccess = createAction(AuthActions.logOutSuccess);
