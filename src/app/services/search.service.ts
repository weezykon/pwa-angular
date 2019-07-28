import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  api = 'https://api.pexels.com/v1/search';
  // tslint:disable-next-line:no-inferrable-types
  queryUrl: string = '?query=';
  lastUrl = '&per_page=15&page=1';
  // tslint:disable-next-line:no-trailing-whitespace
  
  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http
    .get(this.api + this.queryUrl + term + this.lastUrl)
    .map(res => res);
  }

  fetchphotos() {
    return this.http
    .get('https://api.pexels.com/v1/curated?per_page=15&page=1');
  }
}
