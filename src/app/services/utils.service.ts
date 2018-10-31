import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  routes = {
    root: '/',
    tasks: '/tasks'
  };

  db = {
    users: (userId: string): string => { return 'users/' + userId }
  };

  constructor() { }
}
