import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private account: AccountService) { }

  ngOnInit() {
    this.userSubscription = this.firebaseAuth.authState
      .subscribe((user: firebase.User) => {
        if (user) {
          this.router.navigate(['/tasks']);
        }
      })
  }

  connectWithFacebook() {
    let facebookProvider = new auth.FacebookAuthProvider();
    this.account.login(facebookProvider)
      .catch((error) => {
        console.log(error)
      });
  }

  connectWithGoogle() {
    let googleProvider = new auth.GoogleAuthProvider();
    this.account.login(googleProvider)
      .catch((error) => {
        console.log(error)
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
