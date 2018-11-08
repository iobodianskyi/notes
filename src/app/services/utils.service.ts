import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  routes = {
    root: '/',
    tasks: '/tasks'
  };

  db = {
    users: (): string => { return 'users/' },
    user: (userId: string): string => { return this.db.users() + userId },
    tasks: (userId: string): string => { return this.db.user(userId) + '/tasks/' },
    task: (taskId: string, userId: string): string => { return this.db.tasks(userId) + taskId },
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
      title: 'Task created'
    },
    edit: {
      name: 'edit',
      title: 'Task updated'
    },
    trash: {
      name: 'trash',
      title: 'Task trashed'
    },
    restoreTrashed: {
      name: 'restore-trashed',
      title: 'Task restored'
    },
    delete: {
      name: 'delete',
      title: 'Task deleted'
    },
    setColor: {
      name: 'set-color',
      title: 'Task updated'
    }
  }

  constructor() { }
}
