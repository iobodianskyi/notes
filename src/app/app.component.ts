import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loaders: number;

  constructor(private loader: LoaderService) {
    this.updateLoader();
  }

  updateLoader() {
    this.loader.loaders$
      .subscribe((length: number) => {
        this.loaders = length;
      });
  }
}
