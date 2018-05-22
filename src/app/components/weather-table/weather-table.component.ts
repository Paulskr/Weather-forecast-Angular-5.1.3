import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { PagerService } from '../../services/index'
import { WeatherService } from '../../services/weather.service';



@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss']
})


export class WeatherTableComponent implements OnInit {
  
  title = 'World Weather Application';
	private listJsons: any;
  // Pagination
  pager: any = {};
  pagedItems: any = [];
  // Order List
  reverse: boolean = false;
  order: string = 'name';

	constructor(private http: HttpClient, 
              private weatherService: WeatherService, 
              private pagerService: PagerService) {}

	ngOnInit() {
  	this.weatherService.cityListJson().subscribe((listJsons) => {
    		// console.log(listJsons);
    		this.listJsons = listJsons;
        this.setPage(1);
  	});
	}

  // Pagination
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.listJsons.length, page);
    // get current page of items
    this.pagedItems = this.listJsons.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  // Order List Of Cities
  setOrder(value: string) {
    if(this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}