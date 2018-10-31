import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {

  constructor(
    private account: AccountService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.account.getUser()
      .pipe(
        take(1),
        map(user => !(!!user)),
        tap(notLoggedIn => {
          if (!notLoggedIn) this.router.navigate(['/tasks']);
        })
      )
  }
}
