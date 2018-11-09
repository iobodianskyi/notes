import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  routes = {
    root: '/',
    notes: '/notes'
  };

  db = {
    users: (): string => { return 'users/' },
    user: (userId: string): string => { return this.db.users() + userId },
    notes: (userId: string): string => { return this.db.user(userId) + '/notes/' },
    note: (noteId: string, userId: string): string => { return this.db.notes(userId) + noteId },
    fields: {
      created: 'created',
      trashed: 'trashed'
    }
  };

  delays = {
    undoActionPresence: 10000
  }

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
  }

  constructor() { }
}
