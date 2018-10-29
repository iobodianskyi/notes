import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AppUser } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
  user: AppUser;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private firebaseStore: AngularFirestore) {
    this.setDefaults();
  }

  setDefaults() {
    this.user = null;
  }

  login(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential: firebase.auth.UserCredential) => {
        this.updateAppUser(credential.user)
      });
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  updateAppUser(user: User) {
    const usersDoc: AngularFirestoreDocument<AppUser> = this.firebaseStore.doc('users/' + user.uid);
    const updateUser: AppUser = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoURL
    };

    this.user = updateUser;

    usersDoc.set(updateUser, { merge: true })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.setDefaults();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
