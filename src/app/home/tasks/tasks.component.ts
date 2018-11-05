import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;
  search$: Observable<Task[]>;
  color$: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks$ = this.taskService.search$
      .pipe(
        switchMap(search => {
          const tasks = this.taskService.getAll();
          if (!search) { return tasks; }
          else {
            return tasks.pipe(
              map((tasks: Task[]) =>
                tasks.filter((task: Task) =>
                  task.note.includes(search))));
          }
        }));
  }

  focusOut(editElement) {
    if (editElement.textContent) {
      this.taskService.create(editElement.innerHTML)
        .catch(console.log);

      editElement.textContent = '';
    }
  }
}
