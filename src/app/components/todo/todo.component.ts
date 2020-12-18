import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTodo, loadTodoList } from 'src/app/state/todo/actions';
import { IStore } from 'src/app/models/store';

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
  public view = new FormControl('inline');

  public showAdditional: boolean;

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

}
