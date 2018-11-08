import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ActionService } from 'src/app/services/action.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  focused: boolean;

  constructor(
    private action: ActionService,
    private utils: UtilsService) { }

  ngOnInit() { }

  focusOut(editedElement) {
    if (editedElement.textContent &&
      editedElement.textContent !== this.task.note) {
      const oldTask = { ...this.task };
      this.task.note = editedElement.innerHTML;
      this.action.execute(this.utils.actions.edit, this.task, oldTask);
    }

    editedElement.innerHTML = this.task.note;
  }

  setColor(color: string) {
    if (color !== this.task.color) {
      const oldTask = { ...this.task };
      this.task.color = color;
      this.action.execute(this.utils.actions.setColor, this.task, oldTask);
    }
  }

  resetColor() {
    if ('' !== this.task.color) {
      const oldTask = { ...this.task };
      this.task.color = '';
      this.action.execute(this.utils.actions.setColor, this.task, oldTask);
    }
  }

  moveToTrash() {
    const oldTask = { ...this.task };
    this.task.trashed = true;
    this.action.execute(this.utils.actions.trash, this.task, oldTask);
  }

  restore() {
    const oldTask = { ...this.task }
    this.task.trashed = false;
    this.action.execute(this.utils.actions.restoreTrashed, this.task, oldTask);
  }

  delete() {
    this.action.execute(this.utils.actions.delete, this.task, { ...this.task });
  }
}
