import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { TaskService } from './task.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Action } from '../models/actions';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private lastAction$ = new BehaviorSubject<Action>(null);
  private lastAction: Action = null;
  private timerRemovingUndoAction;

  constructor(
    private taskService: TaskService,
    private utils: UtilsService) { }

  getLast(): Observable<Action> { return this.lastAction$; }

  execute(info, newTask: Task, oldTask: Task): any {
    let actionPromise;

    const lastAction = <Action>{ info, newTask, oldTask };

    switch (info.name) {
      case this.utils.actions.edit.name:
      case this.utils.actions.setColor.name:
      case this.utils.actions.complete.name:
      case this.utils.actions.trash.name:
      case this.utils.actions.restoreTrashed.name: {
        actionPromise = this.taskService.update(newTask);
        break;
      }
      case this.utils.actions.delete.name: {
        actionPromise = this.taskService.delete(newTask.id);
        break;
      }
      default: {
        break;
      }
    }

    return actionPromise
      .then(() => {
        this.nextAction(lastAction);
      });
  }

  undoLast(name) {
    let actionPromise;
    switch (name) {
      case this.utils.actions.edit.name:
      case this.utils.actions.setColor.name:
      case this.utils.actions.complete.name:
      case this.utils.actions.trash.name:
      case this.utils.actions.restoreTrashed.name: {
        actionPromise = this.taskService.updateToOld(this.lastAction.oldTask);
        break;
      }
      case this.utils.actions.delete.name: {
        actionPromise = this.taskService.create(this.lastAction.oldTask)
          .then((ref: firebase.firestore.DocumentReference) => {
            this.lastAction.oldTask.id = ref.id;
            return ref.update(this.lastAction.oldTask);
          });
        break;
      }
      default: {
        break;
      }
    }

    return actionPromise
      .then(() => {
        this.lastAction = null;
        this.lastAction$.next(null);
      });
  }

  nextAction(lastAction: Action) {
    this.lastAction = lastAction;
    this.lastAction$.next(lastAction);
    
    clearTimeout(this.timerRemovingUndoAction);
    this.timerRemovingUndoAction = setTimeout(() => {
      this.lastAction$.next(null);
    }, this.utils.delays.undoActionPresence);
  }
}
