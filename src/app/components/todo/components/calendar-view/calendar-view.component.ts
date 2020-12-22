import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDay, getDaysInMonth, getWeeksInMonth, startOfMonth, addDays } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStore } from 'src/app/models/store';
import { Todo } from 'src/app/models/todo';
import { selectTasksWithDate } from 'src/app/state/todo/selectors';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent {

  public today = new Date();

  public days$: Observable<any>;

  private tasks$: Observable<Todo[]> = this.store.select(selectTasksWithDate, this.today.getMonth());

  constructor(
    private store: Store<IStore>
  ) {
    this.days$ = this.tasks$.pipe(
      map(tasks => Array(getDaysInMonth(this.today)).fill(null).map((v, index) => (
        {
          day: addDays(startOfMonth(this.today), index),
          tasks: tasks.filter(task => new Date(task?.date.seconds * 1000).getDate() === index + 1)
        }
      ))),
      map(days => Array(getWeeksInMonth(this.today))
        .fill(null)
        .map((v, index) => {
          const numberOfFirstDay = getDay(days[0].day);
          if (index === 0) {
            return Array(numberOfFirstDay)
              .fill(null)
              .map(() => ({ day: null, tasks: [] }))
              .concat((days as unknown as []).slice(0, 7 - numberOfFirstDay));
          }
          const array = (days as unknown as []).slice(index * 7 - numberOfFirstDay, 7 - numberOfFirstDay + index * 7);
          if (index === getWeeksInMonth(this.today) - 1) {
            return (array as any)
              .concat(Array(7 - array.length)
                .fill(null)
                .map(() => ({ day: null, tasks: [] })));
          }
          return array;
        })
      ),
    );
  }

}
