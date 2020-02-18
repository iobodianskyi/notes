import { Component, OnInit, OnDestroy } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { combineLatest, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTrashDialogComponent } from 'src/app/dialogs/confirm-trash/confirm-trash-dialog.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html'
})
export class TrashComponent implements OnInit, OnDestroy {
  trashedNotes: Note[];
  allTrashedLength = 0;
  filteredNotes: Subscription;

  constructor(private noteService: NoteService, public dialog: MatDialog) { }

  ngOnInit() {
    this.filteredNotes = combineLatest([
      this.noteService.getTrashed(),
      this.noteService.search$,
      this.noteService.color$])
      .subscribe(([notes, search, color]) => {
        this.allTrashedLength = notes.length;
        this.trashedNotes = notes
          .filter((note: Note) =>
            note.note.toLowerCase().includes(search.toLowerCase()) &&
            note.color.includes(color));
      });
  }

  emptyTrash() {
    this.openConfirmDialog();
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmTrashDialogComponent, { panelClass: 'app-dialog' });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.noteService.emptyTrash();
      }
    });
  }

  ngOnDestroy() {
    this.filteredNotes.unsubscribe();
  }
}
