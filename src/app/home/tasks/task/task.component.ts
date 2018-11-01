import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor(private taskService: TaskService) { }

  ngOnInit() { }

  focusOut(editedElement) {
    if (editedElement.textContent) {
      this.task.note = editedElement.textContent;
      this.taskService.update(this.task);
    }

    editedElement.textContent = this.task.note;
  }
}
