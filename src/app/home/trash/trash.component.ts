import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html'
})
export class TrashComponent implements OnInit, OnDestroy {
  trashedNotes: Note[];
  allTrashedLength: number = 0;
  filteredNotes: Subscription;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.filteredNotes = combineLatest(
      this.noteService.getTrashed(),
      this.noteService.search$,
      this.noteService.color$)
      .subscribe(([notes, search, color]) => {
        this.allTrashedLength = notes.length;
        this.trashedNotes = notes
          .filter((note: Note) =>
            note.note.toLowerCase().includes(search.toLowerCase()) &&
            note.color.includes(color));
      });
  }

  emptyTrash() {
    this.noteService.emptyTrash();
  }

  ngOnDestroy() {
    this.filteredNotes.unsubscribe();
  }
}
