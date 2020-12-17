import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineViewComponent } from './inline-view.component';

describe('InlineViewComponent', () => {
  let component: InlineViewComponent;
  let fixture: ComponentFixture<InlineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
