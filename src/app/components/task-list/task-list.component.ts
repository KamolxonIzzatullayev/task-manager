import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    }, error => {
      console.error('Error fetching tasks:', error);
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }, error => {
      console.error('Error deleting task:', error);
    });
  }

  editTask(id: number): void {
    this.router.navigate(['/task-detail', id]);
  }

  addTask(): void {
    this.router.navigate(['/task-detail']);
  }
}
