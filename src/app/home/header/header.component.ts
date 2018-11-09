import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AppUser } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';

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
    private notesService: NoteService) { }

  ngOnInit() {
    this.userSubscribtion = this.account.getAppUser()
      .subscribe(user => { this.user = user });
  }

  searchChanged() {
    this.search = this.search.trim();
    this.notesService.search$.next(this.search)
  }

  filterColor(color) {
    this.notesService.color$.next(color);
    this.hasColorFilter = !!color;
  }

  logout() {
    this.account.logout();
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }
}
