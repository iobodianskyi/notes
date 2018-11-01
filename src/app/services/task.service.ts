import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { first, switchMap, map, tap } from 'rxjs/operators';
import { AppUser } from '../models/user';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskCollection: AngularFirestoreCollection<Task>;

  constructor(
    private firebaseStore: AngularFirestore,
    private account: AccountService,
    private utils: UtilsService) {
  }

  getAll(): Observable<Task[]> {
    return this.account.getUser()
      .pipe(first(),
        switchMap((user) => {
          const tasksPath = this.utils.db.tasks(user.id);
          this.taskCollection = this.firebaseStore.collection<Task>(
            tasksPath, ref => ref.orderBy(this.utils.db.fields.created, 'desc'));

          return this.taskCollection.snapshotChanges().pipe(
            map(changeActions => {
              return changeActions.map(changeAction => {
                const data = changeAction.payload.doc.data();
                return <Task>{ id: changeAction.payload.doc.id, ...data };
              })
            })
          );
        }));
  }

  create(task: Task) {
    return this.taskCollection.add(task);
  }

  update(task: Task) {
    return this.account.getUser()
      .pipe(first()).subscribe((user) => {
        const taskPath = this.utils.db.task(task.id, user.id);

        return this.firebaseStore.doc<Task>(taskPath)
          .set(task, { merge: true })
          .catch((error) => {
            console.log(error);
          });
      });
  }
}
