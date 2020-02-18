import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';
import { ActionService } from 'src/app/services/action.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  focused: boolean;

  constructor(
    private action: ActionService,
    private utils: UtilsService) { }

  ngOnInit() { }

  focusOut(editedElement: any) {
    if (editedElement.textContent &&
      editedElement.textContent !== this.note.note) {
      const oldNote = { ...this.note };
      this.note.note = editedElement.innerHTML;
      this.action.execute(this.utils.actions.edit, this.note, oldNote);
    }

    editedElement.innerHTML = this.note.note;
  }

  setColor(color: string) {
    if (color !== this.note.color) {
      const oldNote = { ...this.note };
      this.note.color = color;
      this.action.execute(this.utils.actions.setColor, this.note, oldNote);
    }
  }

  resetColor() {
    if ('' !== this.note.color) {
      const oldNote = { ...this.note };
      this.note.color = '';
      this.action.execute(this.utils.actions.setColor, this.note, oldNote);
    }
  }

  moveToTrash() {
    const oldNote = { ...this.note };
    this.note.trashed = true;
    this.action.execute(this.utils.actions.trash, this.note, oldNote);
  }

  restore() {
    const oldNote = { ...this.note };
    this.note.trashed = false;
    this.action.execute(this.utils.actions.restoreTrashed, this.note, oldNote);
  }

  delete() {
    this.action.execute(this.utils.actions.delete, this.note, { ...this.note });
  }
}
