import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: Note[];
  allNotesLength = 0;
  filteredNotes: Subscription;
  focused = false;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.filteredNotes = combineLatest(
      this.noteService.getAll(),
      this.noteService.search$,
      this.noteService.color$)
      .subscribe(([notes, search, color]) => {
        this.allNotesLength = notes.length;
        this.notes = notes
          .filter((note: Note) =>
            note.note.toLowerCase().includes(search.toLowerCase()) &&
            note.color.includes(color));
      });
  }

  focusOut(editElement) {
    editElement.textContent = editElement.textContent.trim();

    if (editElement.textContent) {
      const date = new Date();
      const note = <Note>{
        note: editElement.innerHTML,
        created: date,
        edited: date,
        color: '',
        trashed: false
      };

      this.noteService.create(note);

      editElement.textContent = '';
    }

    this.focused = false;
  }

  ngOnDestroy() {
    this.filteredNotes.unsubscribe();
  }
}
