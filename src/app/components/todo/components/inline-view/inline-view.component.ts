import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-inline-view',
  templateUrl: './inline-view.component.html',
  styleUrls: ['./inline-view.component.scss']
})
export class InlineViewComponent {
  @Input() public todoList$: Observable<Todo[]>;
  @Input() public allTasksCompleted$: Observable<boolean>;

  @Output() public deleteEvent = new EventEmitter<Todo>();
  @Output() public completeEvent = new EventEmitter<Todo>();

  public delete(value: Todo): void {
    this.deleteEvent.emit(value);
  }

  public complete(value: Todo): void {
    this.completeEvent.emit(value);
  }

}
