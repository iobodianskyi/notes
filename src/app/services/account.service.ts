import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AccountService {
  user: firebase.User;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth) {
    this.setDefaults();
  }

  setDefaults() {
    this.user = null;
  }

  setUser(user) {
    this.user = user;
  }

  login(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider);
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

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
