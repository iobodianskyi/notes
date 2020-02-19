import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'firebase';

import { AccountService } from 'src/app/services/account.service';
import { NoteService } from 'src/app/services/note.service';
import { CleanUpService } from 'src/app/services/cleanup.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MenuDialogComponent } from 'src/app/dialogs/menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscription = new Subscription();
  search: string;

  constructor(
    private router: Router,
    private utils: UtilsService,
    private account: AccountService,
    private cleanup: CleanUpService,
    private dialog: MatDialog,
    public notesService: NoteService) { }

  ngOnInit() {
    this.subscription.add(
      this.account.getAppUser()
        .subscribe(user => { this.user = user; }));
  }

  openMenu() {
    const dialogRef = this.dialog.open(MenuDialogComponent, this.utils.menuDialogOptions);

    dialogRef.afterClosed().subscribe((action: string) => {
      switch (action) {
        case this.utils.menuActions.logout: {
          this.logout();
          break;
        }
        default:
          break;
      }
    });
  }

  searchChanged() {
    this.search = this.search.trim();
    this.notesService.search$.next(this.search);
  }

  filterColor(color: string) {
    this.notesService.color$.next(color);
  }

  logout() {
    this.account.logout()
      .finally(() => {
        this.cleanup.cleanUpAppData();
        this.router.navigate([this.utils.routes.root]);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
