import { Component, AfterViewChecked } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked {
  hasLoader = true;

  constructor(private loader: LoaderService) { }

  ngAfterViewChecked() {
    this.updateLoader();
  }

  updateLoader() {
    this.loader.loaders$
      .subscribe((length: number) => {
        this.hasLoader = !!length;
      });
  }
}
