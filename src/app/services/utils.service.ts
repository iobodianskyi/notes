import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  appId = 'notes';

  routes = {
    root: '/',
    notes: '/notes'
  };

  urls = {
    appInfo: 'https://us-central1-dev-obodianskyi.cloudfunctions.net/projectInfo',
    // will be filled from db
    sendMessage: ''
  };

  db = {
    users: (): string => 'users/',
    user: (userId: string): string => this.db.users() + userId,
    notes: (userId: string): string => this.db.user(userId) + '/notes/',
    note: (noteId: string, userId: string): string => this.db.notes(userId) + noteId,
    fields: {
      created: 'created',
      trashed: 'trashed'
    }
  };

  delays = {
    undoActionPresence: 10000
  };

  actions = {
    create: {
      name: 'create',
      title: 'Note created'
    },
    edit: {
      name: 'edit',
      title: 'Note updated'
    },
    trash: {
      name: 'trash',
      title: 'Note trashed'
    },
    restoreTrashed: {
      name: 'restore-trashed',
      title: 'Note restored'
    },
    delete: {
      name: 'delete',
      title: 'Note deleted'
    },
    setColor: {
      name: 'set-color',
      title: 'Note updated'
    }
  };

  userSignUpMessage = '[Notes] - User sing in/up';

  constructor(private http: HttpClient) { }

  getAppInfo() {
    this.http.get(this.urls.appInfo, { params: { id: this.appId }, headers: { } })
      .subscribe((appInfo: any) => {
        this.urls.sendMessage = appInfo.sendMessage;
      });
  }
}
