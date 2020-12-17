import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  
  @Input() todoList$: Observable<Todo[]>;
  
  @Output() public deleteEvent = new EventEmitter<Todo>();
  @Output() public completeEvent = new EventEmitter<Todo>();

  public delete(value: Todo): void {
    this.deleteEvent.emit(value);
  }

  public complete(value: Todo): void {
    this.completeEvent.emit(value);
  }

}
