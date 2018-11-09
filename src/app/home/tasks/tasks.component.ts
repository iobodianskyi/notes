import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[];
  allTasksLength: number = 0;
  filteredTasks: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.filteredTasks = combineLatest(
      this.taskService.getAll(),
      this.taskService.search$,
      this.taskService.color$)
      .subscribe(([tasks, search, color]) => {
        this.allTasksLength = tasks.length;
        this.tasks = tasks
          .filter((task: Task) =>
            task.note.toLowerCase().includes(search.toLowerCase()) &&
            task.color.includes(color));
      });
  }

  focusOut(editElement) {
    if (editElement.textContent) {
      const date = new Date();
      const task = <Task>{
        note: editElement.innerHTML,
        created: date,
        edited: date,
        color: '',
        trashed: false
      };

      this.taskService.create(task)
        .catch(console.log);

      editElement.textContent = '';
    }
  }

  ngOnDestroy() {
    this.filteredTasks.unsubscribe();
  }
}
