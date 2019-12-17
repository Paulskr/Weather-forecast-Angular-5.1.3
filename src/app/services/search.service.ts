import { empty as observableEmpty,  Observable } from 'rxjs';
import { catchError, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class SearchService {

	baseUrl: string = 'https://api.openweathermap.org/data/2.5/find';
  queryUrl: string = '?q=';
  endUrl: string = '&units=metric&appid=8371a82502f68c1f69df7d4fceb5cf42';

  constructor(private http: HttpClient) {
  	console.log('Search Service Connected ...');
  }


  searchEntries(term) {
    return this.http.get(this.baseUrl + this.queryUrl + term + this.endUrl).pipe(
      map(res => res));
  }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.searchEntries(term).pipe(
      catchError( error => { return observableEmpty() }))),);
  }
  //.filter(term => term && term.trim().length > 0)
}
