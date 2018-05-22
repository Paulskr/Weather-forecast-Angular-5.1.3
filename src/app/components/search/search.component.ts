import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

	private results: any = {};
  private searchTerms = new Subject<string>();


  constructor(private http: HttpClient,
  						private searchService: SearchService) { }

  ngOnInit() {
  	this.searchService.search(this.searchTerms)
  	.subscribe(results => {
	  		this.results = results;
	  		console.log(results);
  	});
  }

  searchKey($event) {
  	let evnt = $event.target.value;
  	this.searchTerms.next(evnt);

  	if(evnt.length === 0) {
  		this.results = [];
  	}
  }
  
 	clickedInside($event: Event) {
    $event.stopPropagation();  // <- that will stop propagation on lower layers
    // console.log("CLICKED INSIDE");
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
	  // console.log("CLICKED OUTSIDE");
	  this.results = true;
	}
}
 