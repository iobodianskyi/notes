import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Observable  } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.tasks$ = this.taskService.getAll();
  }

  focusOut(editElement) {
    if (editElement.textContent) {
      this.taskService.create(editElement.innerHTML)
        .catch(console.log);

      editElement.textContent = '';
    }
  }
}
