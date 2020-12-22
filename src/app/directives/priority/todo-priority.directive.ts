import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTodoPriority]'
})
export class TodoPriorityDirective implements OnInit{

  @Input('appTodoPriority') private priority: string;

  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  public ngOnInit(): void {
    this.element.nativeElement.style.borderLeft = `3px solid ${this.priority === 'high'
      ? 'red'
      : this.priority === 'medium'
        ? 'green'
        : 'white'}`;
  }

}
