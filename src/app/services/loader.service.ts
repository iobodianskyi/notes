import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  public loaders$: Observable<number>;
  private loadersSubject = new BehaviorSubject<number>(0);
  private loaders: number[] = [];

  constructor() {
    this.loaders$ = this.loadersSubject.asObservable();
  }

  add() {
    this.loaders.push(1);
    this.loadersSubject.next(this.loaders.length);
  }

  remove() {
    if (this.loaders.length) {
      --this.loaders.length;
    }

    this.loadersSubject.next(this.loaders.length);
  }

  clear() {
    this.loaders.length = 0;
  }
}
