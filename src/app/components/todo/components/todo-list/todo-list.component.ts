import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';
import { deleteTodo, editTodo, completeTodo, loadTodoList } from 'src/app/state/todo/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() todoList$: Observable<Todo[]>;
  @Input() draggable: boolean;

  constructor(
    private store: Store<IStore>,
  ) {}

  public delete(todo: Todo): void {
    this.store.dispatch(deleteTodo({ payload: todo }));
  }

  public edit(todo: Todo, description: string): void {
    this.store.dispatch(editTodo({ todo: {...todo, description} } as any));
  }

  public complete(todo: Todo): void {
    this.store.dispatch(completeTodo({ payload: todo }));
  }

}
