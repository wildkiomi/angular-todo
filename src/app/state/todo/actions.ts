import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo';

export enum TodoActions {
  loadTodoList = '[Todo Component] Load TodoList',
  loadTodoListSuccess = '[TodoList API] TodoList Loaded Success',
  completeTodo = '[Todo Component] Complete Todo',
  changePriority = '[Todo Component] Change Priority',
  addTodo = '[Todo Component] Add Todo',
  deleteTodo = '[Todo Component] Delete Todo',
}

export const loadTodoList = createAction(TodoActions.loadTodoList);
export const loadTodoListSuccess = createAction(
  TodoActions.loadTodoListSuccess,
  props<{ payload: Todo[] }>()
);
export const completeTodo = createAction(
  TodoActions.completeTodo,
  props<{ payload: Todo }>()
);
export const changePriority = createAction(
  TodoActions.changePriority,
  props<{ todo: Todo, priority: string }>()
);
export const addTodo = createAction(
  TodoActions.addTodo,
  props<{ payload: Todo }>()
);
export const deleteTodo = createAction(
  TodoActions.deleteTodo,
  props<{ payload: Todo }>()
);

