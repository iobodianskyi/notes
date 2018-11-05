import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AppUser } from 'src/app/models/user';
import { Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';
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
  searchSubject = new BehaviorSubject<string>('');

  constructor(
    private account: AccountService,
    private tasksService: TaskService,
    private utils: UtilsService) { }

  ngOnInit() {
    this.userSubscribtion = this.account.getAppUser()
      .subscribe(user => { this.user = user });

    this.searchSubject
      .pipe(
        debounceTime(this.utils.searchDelay),
        distinctUntilChanged())
      .subscribe((search) => {
        console.log(' d - ' + search);
        this.filterSearch(search);
      });
  }

  searchChanged() {
    this.search = this.search.trim();

    console.log(this.search);
    this.searchSubject.next(this.search);
  }

  filterSearch(search) {
    this.tasksService.search$.next(search);
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
    this.searchSubject.unsubscribe();
  }
}
