import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  taskSubscribtion: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks$ = this.taskService.getAll();
  }
}
