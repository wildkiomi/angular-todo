import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';
import { selectHighPriorityTasks, selectLowPriorityTasks, selectMediumPriorityTasks } from 'src/app/state/todo/selectors';
import { changePriority } from 'src/app/state/todo/actions';

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

  public drop(event): void {
    this.store.dispatch(changePriority({ todo: event.item.data, priority: event.container.id }));
  }

}
