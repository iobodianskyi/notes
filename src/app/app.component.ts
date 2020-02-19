import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AccountService } from './services/account.service';
import { Router, NavigationEnd } from '@angular/router';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  hasLoader = true;
  user: any;

  constructor(
    private loader: LoaderService,
    private account: AccountService,
    private router: Router,
    private utils: UtilsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });

    this.account.getAuthState()
      .subscribe(user => { this.user = user; });
  }

  ngOnInit(): void {
    this.updateLoader();

    this.account.checkRedirectSignUp();

    this.utils.getAppInfo();
  }

  updateLoader() {
    this.loader.loaders$
      .subscribe((length: number) => {
        setTimeout(() => { this.hasLoader = !!length; });
      });
  }
}
