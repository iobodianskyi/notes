import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { UtilsService } from './utils.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TaskService {
  search$ = new BehaviorSubject<string>('');
  color$ = new BehaviorSubject<string>('');

  constructor(
    private firebaseStore: AngularFirestore,
    private account: AccountService,
    private utils: UtilsService) { }

  getAll(): Observable<Task[]> {
    const userId = this.account.getUser().uid;
    const tasksPath = this.utils.db.tasks(userId);

    return this.firebaseStore
      .collection<Task>(tasksPath, this.queryTasks())
      .snapshotChanges()
      .pipe(this.mapTaskChanges());
  }

  getCompleted() {
    const userId = this.account.getUser().uid;
    const tasksPath = this.utils.db.tasks(userId);
    return this.firebaseStore
      .collection<Task>(tasksPath, this.queryCompleted())
      .snapshotChanges()
      .pipe(this.mapTaskChanges());
  }

  getTrashed() {
    const userId = this.account.getUser().uid;
    const tasksPath = this.utils.db.tasks(userId);
    return this.firebaseStore
      .collection<Task>(tasksPath, this.queryTrashed())
      .snapshotChanges()
      .pipe(this.mapTaskChanges());
  }

  create(note: string) {
    const date = new Date();
    const task = <Task>{
      note: note,
      created: date,
      edited: date,
      completed: false,
      color: '',
      trashed: false
    };

    return this.getTaskCollection().add(task);
  }

  update(task: Task) {
    task.edited = new Date();
    return this.getTaskDocument(task.id)
      .set(task, { merge: true });
  }

  moveToTrash(task: Task) {
    task.trashed = true;
    return this.getTaskDocument(task.id)
      .set(task, { merge: true });
  }

  delete(taskId) {
    this.getTaskDocument(taskId)
      .delete();
  }

  private queryTasks() {
    return (ref: firebase.firestore.CollectionReference) => {
      let query = ref
        .where(this.utils.db.fields.trashed, '==', false)
        .where(this.utils.db.fields.completed, '==', false)
        .orderBy(this.utils.db.fields.created, 'desc');

      return query;
    }
  }

  private queryCompleted() {
    return (ref: firebase.firestore.CollectionReference) => {
      let query = ref
        .where(this.utils.db.fields.trashed, '==', false)
        .where(this.utils.db.fields.completed, '==', true)
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

  private mapTaskChanges() {
    return map((changeActions: DocumentChangeAction<Task>[]) => {
      return changeActions.map(changeAction => {
        const data = changeAction.payload.doc.data();
        return <Task>{ id: changeAction.payload.doc.id, ...data };
      })
    })
  }

  private getTaskCollection(): AngularFirestoreCollection<Task> {
    const userId = this.account.getUser().uid;
    const tasksPath = this.utils.db.tasks(userId);

    return this.firebaseStore.collection<Task>(tasksPath);
  }

  private getTaskDocument(taskId: string): AngularFirestoreDocument<Task> {
    const userId = this.account.getUser().uid;
    const taskPath = this.utils.db.task(taskId, userId);

    return this.firebaseStore.doc<Task>(taskPath);
  }
}
