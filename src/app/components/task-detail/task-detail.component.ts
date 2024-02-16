import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { fabric } from 'fabric';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})


export class TaskDetailComponent implements OnInit, AfterViewInit {
  task: Task = new Task(0, '', '', 'Pending');
  canvas: fabric.Canvas;
  @ViewChild('htmlCanvas') htmlCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.params['id'];
    if (taskId) {
      this.taskService.getTaskById(taskId).subscribe(task => {
        this.task = task;

        if (this.canvas && this.task.fabricData) {
          const parsedData = JSON.parse(this.task.fabricData);
          this.canvas.loadFromJSON(parsedData, () => {
            this.canvas.renderAll();
          });
        }
      });

    }
  }

  ngAfterViewInit(): void {
    this.canvas = new fabric.Canvas(this.htmlCanvas.nativeElement, {
      isDrawingMode: true
    });
  }

  saveTask(): void {
    const canvasData = JSON.stringify(this.canvas.toJSON());
    this.task.fabricData = canvasData;
    if (this.task.id) {
      this.taskService.updateTask(this.task).subscribe(() => this.goBack());
    } else {
      let currentId = 0;

      this.taskService.getTasks().subscribe(tasks => {
        currentId = Number(tasks[tasks.length - 1].id) + 1;
        // @ts-ignore
        this.task.id = String(currentId);
        this.taskService.addTask(this.task).subscribe(() => this.goBack());
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
