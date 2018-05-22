import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';


@Injectable()
export class SearchService {

	private baseUrl: string = 'https://api.openweathermap.org/data/2.5/find';
  private queryUrl: string = '?q=';
  private endUrl: string = '&units=metric&appid=8371a82502f68c1f69df7d4fceb5cf42';

  constructor(private http: HttpClient) {
  	console.log('Search Service Connected ...');
  }


  searchEntries(term) {
    return this.http.get(this.baseUrl + this.queryUrl + term + this.endUrl)
      .map(res => res);
  }

  search(terms: Observable<string>) {
    return terms.debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term)
        .catch( error => { return Observable.empty() }));
  }
  //.filter(term => term && term.trim().length > 0)
}
