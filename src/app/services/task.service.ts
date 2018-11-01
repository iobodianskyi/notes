import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from '../models/task';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { first, switchMap, map } from 'rxjs/operators';
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
          const userPath = this.utils.db.user(user.id);
          const tasksPath = this.utils.db.tasks();
          this.taskCollection = this.firebaseStore.doc<AppUser>(userPath).collection<Task>(tasksPath);
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
}
