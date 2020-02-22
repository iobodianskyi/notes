import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'firebase';
import { Subscription } from 'rxjs';

import { AccountService } from 'src/app/services/account.service';
import { UtilsService } from 'src/app/services/utils.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.sass']
})
export class MenuDialogComponent implements OnInit, OnDestroy {
  user: User;
  subscription = new Subscription();
  actions: any;

  constructor(
    private account: AccountService,
    private utils: UtilsService,
    public notesService: NoteService,
    public dialogRef: MatDialogRef<MenuDialogComponent>) {
      this.actions = this.utils.menuActions;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.account.getAuthState()
        .subscribe(user => { this.user = user; }));
  }

  close(action?: string): void {
    this.dialogRef.close(action);
  }

  filterColor(color: string) {
    this.notesService.color$.next(color);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
