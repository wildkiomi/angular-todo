import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';
import { isAllTasksCompleted, isTodoListEmpty, selectTodoList } from 'src/app/state/todo/selectors';

@Component({
  selector: 'app-inline-view',
  templateUrl: './inline-view.component.html',
  styleUrls: ['./inline-view.component.scss']
})
export class InlineViewComponent {

  constructor(
    private store: Store<IStore>,
  ) {}

  public isAllTasksCompleted$: Observable<boolean> = this.store.select(isAllTasksCompleted);
  public isTodoListEmpty$: Observable<boolean> = this.store.select(isTodoListEmpty);
  public todoList$: Observable<Todo[]> = this.store.select(selectTodoList);

}
