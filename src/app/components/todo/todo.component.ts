import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addTodo, completeTodo, deleteTodo, loadTodoList, TodoActions } from 'src/app/state/todo/actions';
import { IStore } from 'src/app/models/store';
import { selectCompletedTasks, selectTodoList } from 'src/app/state/todo/selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  public todoForm = new FormGroup({
    description: new FormControl(''),
    date: new FormControl(''),
    priority: new FormControl('default'),
  });

  public todoList$: Observable<Todo[]> = this.store.select(selectTodoList);
  public showAdditional: boolean;
  public allTasksCompleted$: Observable<boolean> = this.store.select(selectCompletedTasks);

  constructor(
    private store: Store<IStore>
  ) {
    this.showAdditional = false;
    this.store.dispatch(loadTodoList());
  }

  public toggleAdditional(): void {
    this.showAdditional = !this.showAdditional;
  }

  public add(): void {
    if (this.todoForm.value.description === '') {
      return;
    }
    const todo = { ...this.todoForm.value, completed: false };
    this.todoForm.reset();
    this.store.dispatch(addTodo({ payload: todo }));
  }

  public delete(todo: Todo): void {
    this.store.dispatch(deleteTodo({ payload: todo }));
  }

  public complete(todo: Todo): void {
    this.store.dispatch(completeTodo({ payload: todo }));
  }

}
