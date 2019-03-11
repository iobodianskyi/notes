import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AccountService } from './services/account.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  hasLoader = true;

  constructor(
    private loader: LoaderService,
    private account: AccountService,
    private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }
  ngOnInit(): void {
    this.updateLoader();

    this.account.checkRedirectSignUp();
  }

  updateLoader() {
    this.loader.loaders$
      .subscribe((length: number) => {
        setTimeout(() => { this.hasLoader = !!length; });
      });
  }
}
