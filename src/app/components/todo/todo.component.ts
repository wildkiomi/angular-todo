import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  public todoForm = new FormGroup({
    description: new FormControl(''),
    date: new FormControl(''),
    priority: new FormControl('default'),
  });

  public todoList: Todo[] = [];
  public showAdditional = false;
  public allTaskCompleted = false;

  constructor(
    private todoService: TodoService,
  ) { }

  public ngOnInit(): void {
    this.getTodoList();
  }

  public toggleAdditional(): void {
    this.showAdditional = !this.showAdditional;
  }

  private getTodoList(): void {
    this.todoService.getTodoList().subscribe(todoList => {
      this.todoList = todoList;
      this.allTaskCompleted = todoList.length && todoList.every((task: Todo) => task.completed);
    });
  }

  public add(): void {
    const todo = {...this.todoForm.value, completed: false };
    this.todoForm.reset();
    this.todoService.add(todo);
  }

  public delete(todo): void {
    this.todoService.delete(todo);
  }

  public complete(todo: Todo): void {
    this.todoService.complete(todo);
  }

}
