import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ActionService } from 'src/app/services/action.service';
import { Subscription } from 'rxjs';
import { Action } from 'src/app/models/actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuCollapsed: boolean;
  lastAction: string;
  lastActionSubscribtion: Subscription;
  lastActionTitle: string;

  constructor(
    private account: AccountService,
    private action: ActionService) { }

  ngOnInit() {
    this.lastActionSubscribtion = this.action.getLast()
      .subscribe((action: Action) => {
        if (action) {
          this.lastAction = action.info.name;
          this.lastActionTitle = action.info.title;
        }
        else {
          this.resetAction();
        }
      });
  }

  undoAction() {
    this.action.undoLast(this.lastAction);
    this.resetAction();
  }

  logout() {
    this.account.logout();
  }

  resetAction() {
    this.lastAction = null;
    this.lastActionTitle = '';
  }

  ngOnDestroy() {
    this.lastActionSubscribtion.unsubscribe();
  }
}
