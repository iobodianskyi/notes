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
      this.task.note = editedElement.innerHTML;
      this.taskService.update(this.task);
    }

    editedElement.innerHTML = this.task.note;
  }

  moveToTrash() {
    this.taskService.moveToTrash(this.task);
  }

  setColor(color: string) {
    this.task.color = color;
    this.taskService.update(this.task);
  }

  complete() {
    this.task.completed = true;
    this.taskService.update(this.task);
  }
}
