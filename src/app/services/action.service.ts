import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { NoteService } from './note.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Action } from '../models/actions';
import { Note } from '../models/note';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private lastAction$ = new BehaviorSubject<Action>(null);
  private lastAction: Action = null;
  private timerRemovingUndoAction;

  constructor(
    private noteService: NoteService,
    private utils: UtilsService) { }

  getLast(): Observable<Action> { return this.lastAction$; }

  execute(info, newNote: Note, oldNote: Note): any {
    let actionPromise;

    const lastAction = <Action>{ info, newNote, oldNote };

    switch (info.name) {
      case this.utils.actions.edit.name:
      case this.utils.actions.setColor.name:
      case this.utils.actions.trash.name:
      case this.utils.actions.restoreTrashed.name: {
        actionPromise = this.noteService.update(newNote);
        break;
      }
      case this.utils.actions.delete.name: {
        actionPromise = this.noteService.delete(newNote.id);
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
      case this.utils.actions.trash.name:
      case this.utils.actions.restoreTrashed.name: {
        actionPromise = this.noteService.updateToOld(this.lastAction.oldNote);
        break;
      }
      case this.utils.actions.delete.name: {
        actionPromise = this.noteService.create(this.lastAction.oldNote)
          .then((ref: firebase.firestore.DocumentReference) => {
            this.lastAction.oldNote.id = ref.id;
            return ref.update(this.lastAction.oldNote);
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
