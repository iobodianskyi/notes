import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Note } from '../models/note';
import { UtilsService } from './utils.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NoteService {
  search$ = new BehaviorSubject<string>('');
  color$ = new BehaviorSubject<string>('');

  constructor(
    private firebaseStore: AngularFirestore,
    private account: AccountService,
    private utils: UtilsService) { }

  getAll(): Observable<Note[]> {
    const userId = this.account.getUser().uid;
    const notesPath = this.utils.db.notes(userId);

    return this.firebaseStore
      .collection<Note>(notesPath, this.queryNotes())
      .snapshotChanges()
      .pipe(this.mapNoteChanges());
  }

  getTrashed() {
    const userId = this.account.getUser().uid;
    const notesPath = this.utils.db.notes(userId);
    return this.firebaseStore
      .collection<Note>(notesPath, this.queryTrashed())
      .snapshotChanges()
      .pipe(this.mapNoteChanges());
  }

  create(note: Note) {
    return this.getNoteCollection().add(note);
  }

  update(note: Note) {
    note.edited = new Date();
    return this.getNoteDocument(note.id)
      .set(note, { merge: true });
  }

  updateToOld(note: Note) {
    return this.getNoteDocument(note.id)
      .set(note, { merge: true });
  }

  delete(noteId) {
    return this.getNoteDocument(noteId)
      .delete();
  }

  private queryNotes() {
    return (ref: firebase.firestore.CollectionReference) => {
      let query = ref
        .where(this.utils.db.fields.trashed, '==', false)
        .orderBy(this.utils.db.fields.created, 'desc');

      return query;
    }
  }

  private queryTrashed() {
    return (ref: firebase.firestore.CollectionReference) => {
      let query = ref
        .where(this.utils.db.fields.trashed, '==', true)
        .orderBy(this.utils.db.fields.created, 'desc');

      return query;
    }
  }

  private mapNoteChanges() {
    return map((changeActions: DocumentChangeAction<Note>[]) => {
      return changeActions.map(changeAction => {
        const data = changeAction.payload.doc.data();
        return <Note>{ id: changeAction.payload.doc.id, ...data };
      })
    })
  }

  private getNoteCollection(): AngularFirestoreCollection<Note> {
    const userId = this.account.getUser().uid;
    const notesPath = this.utils.db.notes(userId);

    return this.firebaseStore.collection<Note>(notesPath);
  }

  private getNoteDocument(noteId: string): AngularFirestoreDocument<Note> {
    const userId = this.account.getUser().uid;
    const notePath = this.utils.db.note(noteId, userId);

    return this.firebaseStore.doc<Note>(notePath);
  }
}
