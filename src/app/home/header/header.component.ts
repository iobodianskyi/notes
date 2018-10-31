import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AppUser } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: AppUser;
  userSubscribtion: Subscription;

  constructor(private account: AccountService) { }

  ngOnInit() {
    this.userSubscribtion = this.account.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }
}
