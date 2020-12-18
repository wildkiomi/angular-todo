import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo/todo.service';
import { addTodo, changePriority, completeTodo, deleteTodo, loadTodoList, loadTodoListSuccess, TodoActions } from './actions';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) { }

  public loadTodoList$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodoList),
    mergeMap(() => this.todoService.getTodoList()
      .pipe(
        map(todoList => loadTodoListSuccess({ payload: todoList })),
        catchError(() => EMPTY)
      ))
  )
  );

  public addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodo),
    mergeMap((action: any) => from(this.todoService.add(action.payload)))
  ), { dispatch: false });

  public completeTodo$ = createEffect(() => this.actions$.pipe(
    ofType(completeTodo),
    mergeMap((action: any) => from(this.todoService.complete(action.payload)))),
    { dispatch: false });

  public changeTodoPriority$ = createEffect(() => this.actions$.pipe(
    ofType(changePriority),
    mergeMap((action: any) => from(this.todoService.changePriority(action.todo, action.priority)))),
    { dispatch: false });

  public deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTodo),
    mergeMap((action: any) => from(this.todoService.delete(action.payload)))
  ), { dispatch: false });
}
