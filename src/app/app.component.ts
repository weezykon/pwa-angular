import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Subject } from 'rxjs';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchService]
})
export class AppComponent {
  photos: any;
  results: any;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService, private lightbox: Lightbox) {
    this.getPhotos();
    this.searchService.search(this.searchTerm$)
      .subscribe(data => {
        console.log(data);
        this.results = data;
        console.log(this.results);
      });
  }

  getPhotos() {
    this.searchService.fetchphotos()
      .map(data => data)
      .subscribe(
        data => this.photos = data,
        err => console.log(err),
        () => console.log('good')
      );
  }

  open(index: number): void {
    // open lightbox
    console.log(index);
    this.lightbox.open(this.photos, index);
  }

  close(): void {
    // close lightbox programmatically
    this.lightbox.close();
  }
}
