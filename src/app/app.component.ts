import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  hasLoader = true;

  constructor(private loader: LoaderService, private account: AccountService) { }

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
