import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable, of } from 'rxjs';
import { UtilsService } from './utils.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private firebaseAuth: AngularFireAuth,
    private firebaseStore: AngularFirestore,
    private utils: UtilsService,
    private snackBar: MatSnackBar) {
    this.firebaseAuth.authState
      .subscribe((user) => {
        if (!user) { this.router.navigate([this.utils.routes.root]); }
      });
  }

  getAppUser(): Observable<User> {
    const user = this.getUser();
    if (user) {
      return this.firebaseStore.doc<User>(this.utils.db.user(user.uid)).valueChanges();
    } else {
      return of(null);
    }
  }

  getAuthState(): Observable<User> {
    return this.firebaseAuth.authState;
  }

  getUser(): User {
    return this.firebaseAuth.auth.currentUser;
  }

  login(provider: firebase.auth.AuthProvider) {
    this.firebaseAuth.auth.signInWithRedirect(provider);
  }

  checkRedirectSignUp() {
    this.firebaseAuth.auth.getRedirectResult()
      .then((result) => {
        if (result.user) {
          this.updateAppUser(JSON.parse(JSON.stringify(result.user)));
        }
      }).catch((error) => {
        this.snackBar.open(error.message, this.utils.labels.dismissSnackBar);
      });
  }

  private updateAppUser(user: User) {
    const userDocument: AngularFirestoreDocument<User> =
      this.firebaseStore.doc(this.utils.db.user(user.uid));

    userDocument.set(user, { merge: true });

    // new user sign in notification
    const message = `${this.utils.userSignUpMessage} - ${user.displayName}`;
    this.http.post(this.utils.urls.sendMessage, { message: message }).subscribe();
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }
}
