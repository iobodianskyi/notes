import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {

  constructor(
    private account: AccountService,
    private router: Router,
    private loader: LoaderService,
    private utils: UtilsService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    this.loader.add();

    return this.account.getAuthState()
      .pipe(
        take(1),
        map(user => !(!!user)),
        tap(notLoggedIn => {
          this.loader.remove();
          if (!notLoggedIn) this.router.navigate([this.utils.routes.notes]);
        })
      )
  }
}
