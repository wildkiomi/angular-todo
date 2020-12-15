import { createSelector } from '@ngrx/store';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';

export const selectTodoList = (state: IStore) => state.todoList;

export const selectCompletedTasks = createSelector(
  selectTodoList,
  (state: Todo[]) => state.every(task => task.completed)
);
