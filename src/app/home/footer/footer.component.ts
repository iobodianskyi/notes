import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionService } from 'src/app/services/action.service';
import { Subscription } from 'rxjs';
import { Action } from 'src/app/models/actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit, OnDestroy {
  lastAction: string;
  lastActionSubscription: Subscription;
  lastActionTitle: string;

  constructor(private action: ActionService) { }

  ngOnInit() {
    this.lastActionSubscription = this.action.getLast()
      .subscribe((action: Action) => {
        if (action) {
          this.lastAction = action.info.name;
          this.lastActionTitle = action.info.title;
        } else {
          this.resetAction();
        }
      });
  }

  undoAction() {
    this.action.undoLast(this.lastAction);
    this.resetAction();
  }

  resetAction() {
    this.lastAction = null;
    this.lastActionTitle = '';
  }

  ngOnDestroy() {
    this.lastActionSubscription.unsubscribe();
  }
}
