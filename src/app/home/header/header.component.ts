import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AppUser } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuCollapsed: boolean;
  user: AppUser;
  userSubscribtion: Subscription;
  search: string;
  hasColorFilter: boolean = false;

  constructor(
    private account: AccountService,
    private tasksService: TaskService) { }

  ngOnInit() {
    this.userSubscribtion = this.account.getAppUser()
      .subscribe(user => { this.user = user });
  }

  searchChanged() {
    this.search = this.search.trim();

    console.log(this.search);
    this.tasksService.search$.next(this.search)
  }

  filterColor(color) {
    this.tasksService.color$.next(color);
    this.hasColorFilter = !!color;
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }
}
