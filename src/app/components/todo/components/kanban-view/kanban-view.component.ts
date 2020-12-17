import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';
import { selectHighPriorityTasks, selectLowPriorityTasks, selectMediumPriorityTasks } from 'src/app/state/todo/selectors';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.scss']
})
export class KanbanViewComponent {

  @Output() public deleteEvent = new EventEmitter<Todo>();
  @Output() public completeEvent = new EventEmitter<Todo>();

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
}
