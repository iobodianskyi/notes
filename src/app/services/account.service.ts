import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AppUser } from '../models/user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  user: Observable<AppUser | null>;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private firebaseStore: AngularFirestore,
    private utils: UtilsService) {

    this.user = this.firebaseAuth.authState
      .pipe(switchMap(user => {
        if (user) {
          return this.firebaseStore.doc<AppUser>(this.utils.db.user(user.uid)).valueChanges();
        } else {
          return of(null);
        }
      }));

    this.user.subscribe((user) => {
      if (!user) this.router.navigate([this.utils.routes.root]);
    });
  }

  getUser(): Observable<AppUser | null> {
    return this.user;
  }

  login(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential: firebase.auth.UserCredential) => {
        this.updateAppUser(credential.user);
      })
  }

  updateAppUser(user: User) {
    const userDocument: AngularFirestoreDocument<AppUser> =
      this.firebaseStore.doc(this.utils.db.user(user.uid));
      
    const updateUser: AppUser = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL
    };

    userDocument.set(updateUser, { merge: true })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.router.navigate([this.utils.routes.root]);
      });
  }
}
