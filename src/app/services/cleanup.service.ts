import { Injectable } from '@angular/core';
import { ActionService } from './action.service';
import { NoteService } from './note.service';

@Injectable({ providedIn: 'root' })
export class CleanUpService {
  constructor(
    private action: ActionService,
    private note: NoteService) { }

  cleanUpAppData() {
    this.action.clearLastAction();
    this.note.setDefaults();
  }
}
