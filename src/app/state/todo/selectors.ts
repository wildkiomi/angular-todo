import { createSelector } from '@ngrx/store';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';

export const selectTodoList = (state: IStore) => state.todoList;

export const isTodoListEmpty = createSelector(
  selectTodoList,
  (state: Todo[]) => !state.length
);

export const isAllTasksCompleted = createSelector(
  selectTodoList,
  (state: Todo[]) => state.every(task => task.completed)
);

export const selectHighPriorityTasks = createSelector(
  selectTodoList,
  (state: Todo[]) => state.filter(task => task.priority === 'high')
);

export const selectMediumPriorityTasks = createSelector(
  selectTodoList,
  (state: Todo[]) => state.filter(task => task.priority === 'medium')
);

export const selectLowPriorityTasks = createSelector(
  selectTodoList,
  (state: Todo[]) => state.filter(task => task.priority === 'low')
);

