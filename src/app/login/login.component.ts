import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AccountService } from '../services/account.service';

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit {
  constructor(private account: AccountService) { }

  ngOnInit() { }

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
}
