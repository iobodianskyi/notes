import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html'
})
export class TrashComponent implements OnInit, OnDestroy {
  trashedTasks: Task[];
  allTrashedLength: number = 0;
  filteredTasks: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.filteredTasks = combineLatest(
      this.taskService.getTrashed(),
      this.taskService.search$,
      this.taskService.color$)
      .subscribe(([tasks, search, color]) => {
        this.allTrashedLength = tasks.length;
        this.trashedTasks = tasks
          .filter((task: Task) =>
            task.note.includes(search) &&
            task.color.includes(color));
      });
  }

  ngOnDestroy() {
    this.filteredTasks.unsubscribe();
  }
}
