import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListComponent]
    });
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
