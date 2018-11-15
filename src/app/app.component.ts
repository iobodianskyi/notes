import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  hasLoader = true;

  constructor(private loader: LoaderService) { }

  ngOnInit(): void {
    this.updateLoader();
  }

  updateLoader() {
    this.loader.loaders$
      .subscribe((length: number) => {
        setTimeout(() => { this.hasLoader = !!length; });
      });
  }
}
