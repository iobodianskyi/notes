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
      created: 'created'
    }
  };

  constructor() { }
}
