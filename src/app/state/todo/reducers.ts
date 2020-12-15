import { Action, createReducer, on } from '@ngrx/store';
import { loadTodoListSuccess } from './actions';

export const initialState = [];

const _todoReducer = createReducer(
  initialState,
  on(loadTodoListSuccess, (state, action) => action.payload)
);

export const todoReducer = (state, action: Action) =>_todoReducer(state, action);
