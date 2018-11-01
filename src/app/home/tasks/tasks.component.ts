import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { Subscription, Observable, of } from 'rxjs';

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

  focusOut(editElement) {
    if (editElement.textContent) {
      this.taskService.create(<Task>{ note: editElement.textContent, created: new Date() })
        .catch(console.log);

      editElement.textContent = ''
    }
  }
}
