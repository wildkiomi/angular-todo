import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTodoPriority]'
})
export class TodoPriorityDirective {

  @Input('appTodoPriority') priority: string;
  
  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit() {
    this.element.nativeElement.style.borderLeft = `3px solid ${this.priority === 'high'
      ? 'red'
      : this.priority === 'medium'
        ? 'green'
        : 'white'}`;
  }

}
