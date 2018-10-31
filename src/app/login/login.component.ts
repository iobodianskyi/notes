import { Component, OnInit, OnDestroy } from '@angular/core';
import { auth } from 'firebase/app';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {
  user$: Subscription;

  constructor(
    private router: Router,
    private account: AccountService,
    private utils: UtilsService) { }

  ngOnInit() {
    this.user$ = this.account.getUser()
      .subscribe(user => {
        if (user) {
          this.router.navigate([this.utils.routes.tasks]);
        }
      });
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
    this.user$.unsubscribe();
  }
}
