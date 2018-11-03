import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html'
})
export class CompletedComponent implements OnInit {
  completedTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.completedTasks$ = this.taskService.getCompleted();
  }
}
