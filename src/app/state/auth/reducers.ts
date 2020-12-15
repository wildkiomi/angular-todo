import { Action, createReducer, on } from '@ngrx/store';
import { logInSuccess, logOutSuccess } from './actions';

export const initialState = {
  uid: '',
};

const _authReducer = createReducer(
  initialState,
  on(logInSuccess, (state, action) => ({...state, uid: action.payload })),
  on(logOutSuccess, () => ({}))
);

export const authReducer = (state, action: Action) =>_authReducer(state, action);
