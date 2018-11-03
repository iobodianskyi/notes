import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html'
})
export class TrashComponent implements OnInit {
  trashedTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.trashedTasks$ = this.taskService.getTrashed();
  }
}
