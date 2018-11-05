import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  allTasksLength: number = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    const filtered$ = combineLatest(
      this.taskService.getAll(),
      this.taskService.search$,
      this.taskService.color$);

    filtered$.subscribe(([tasks, search, color]) => {
      this.allTasksLength = tasks.length;

      this.tasks = tasks
        .filter((task: Task) =>
          task.note.includes(search) &&
          task.color.includes(color));
    });
  }

  focusOut(editElement) {
    if (editElement.textContent) {
      this.taskService.create(editElement.innerHTML)
        .catch(console.log);

      editElement.textContent = '';
    }
  }
}
