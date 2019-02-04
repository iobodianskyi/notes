import { Component, OnInit, OnDestroy } from '@angular/core';
import { auth } from 'firebase/app';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {
  private login$: Subscription;
  constructor(
    private router: Router,
    private account: AccountService,
    private utils: UtilsService,
    private loader: LoaderService) { }

  ngOnInit() {
    this.login$ = this.account.getAuthState()
      .subscribe((user) => {
        if (user) { this.router.navigate([this.utils.routes.notes]); }
      });

    this.loader.remove();
  }

  connectWithFacebook() {
    const facebookProvider = new auth.FacebookAuthProvider();
    this.account.login(facebookProvider);
  }

  connectWithGoogle() {
    const googleProvider = new auth.GoogleAuthProvider();
    this.account.login(googleProvider);
  }

  ngOnDestroy() {
    this.login$.unsubscribe();
  }
}
