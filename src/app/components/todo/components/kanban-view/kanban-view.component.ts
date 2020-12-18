import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';
import { selectHighPriorityTasks, selectLowPriorityTasks, selectMediumPriorityTasks, selectTodoList } from 'src/app/state/todo/selectors';
import { changePriority } from 'src/app/state/todo/actions';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss']
})
export class KanbanViewComponent {

  @Output() public deleteEvent = new EventEmitter<Todo>();
  @Output() public completeEvent = new EventEmitter<Todo>();

  public todoList$: Observable<Todo[]> = this.store.select(selectTodoList);
  public highPriorityTasks$: Observable<Todo[]> = this.store.select(selectHighPriorityTasks);
  public mediumPriorityTasks$: Observable<Todo[]> = this.store.select(selectMediumPriorityTasks);
  public lowPriorityTasks$: Observable<Todo[]> = this.store.select(selectLowPriorityTasks);

  constructor(
    private store: Store<IStore>
  ) {}

  public delete(value: Todo): void {
    this.deleteEvent.emit(value);
  }

  public complete(value: Todo): void {
    this.completeEvent.emit(value);
  }

  public drop(event): void {
    this.store.dispatch(changePriority({ todo: event.item.data, priority: event.container.id }));
  }

}
