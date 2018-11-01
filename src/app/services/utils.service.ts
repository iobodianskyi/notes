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
    tasks: (): string => { return 'tasks/' },
    task: (taskId: string): string => { return this.db.tasks() + taskId },
    fields: {
      created: 'created'
    }
  };

  constructor() { }
}
