import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html'
})
export class CompletedComponent implements OnInit, OnDestroy {
  completedTasks: Task[];
  allCompletedLength: number = 0;
  filteredTasks: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.filteredTasks = combineLatest(
      this.taskService.getCompleted(),
      this.taskService.search$,
      this.taskService.color$)
      .subscribe(([tasks, search, color]) => {
        this.allCompletedLength = tasks.length;
        this.completedTasks = tasks
          .filter((task: Task) =>
            task.note.includes(search) &&
            task.color.includes(color));
      });
  }

  ngOnDestroy() {
    this.filteredTasks.unsubscribe();
  }
}
