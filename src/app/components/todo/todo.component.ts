import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Todo } from 'src/app/models/todo';
import { Observable } from 'rxjs';
import { every, map, tap } from 'rxjs/operators';

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

  public todoList$: Observable<Todo[]>;
  public showAdditional: boolean;
  public allTasksCompleted$: Observable<boolean>;

  constructor(
    private todoService: TodoService,
  ) { 
    this.showAdditional = false; 
    this.todoList$ = this.todoService.getTodoList();
    this.allTasksCompleted$ = this.todoList$.pipe(
      map(tasks => tasks.every(task => task.completed))
    )
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
    this.todoService.add(todo);
  }

  public delete(todo: Todo): void {
    this.todoService.delete(todo);
  }

  public complete(todo: Todo): void {
    this.todoService.complete(todo);
  }

}
