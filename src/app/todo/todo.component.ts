import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm = new FormGroup({
    description: new FormControl(''),
    date: new FormControl(''),
    priority: new FormControl('default'),
  });

  todoList: Todo[] = [];
  showAdditional: boolean = false;
  allTaskCompleted: boolean = false;

  constructor(
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {
    this.getTodoList();
  }

  toggleAdditional() {
    this.showAdditional = !this.showAdditional;
  }

  getTodoList() {
    this.todoService.getTodoList().subscribe(todoList => {
      this.todoList = todoList;
      this.allTaskCompleted = todoList && todoList.every(task => task.completed);
    });
  }

  add() {
    const todo = {...this.todoForm.value, completed: false };
    this.todoForm.reset();
    this.todoService.add(todo);
  }

  delete(todo): void {
    this.todoService.delete(todo);
  }

  complete(todo: Todo):void {
    this.todoService.complete(todo);
  }

}
