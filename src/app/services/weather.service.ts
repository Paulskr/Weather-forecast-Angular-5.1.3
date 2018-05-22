import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherService {

	apiCityUrl: string;

	constructor( private http: HttpClient ) {
		console.log('Weather Service Connected ...');
	}

	urlApi(cityId) {
  	this.apiCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&units=metric&appid=8371a82502f68c1f69df7d4fceb5cf42';
  }
    // Openweathermap list Api
	cityWeatherForecast() {
		return this.http.get(this.apiCityUrl)
		.map(res => res);
	}

	// Json Cities List
	cityListJson() {
		// Full cities list Openweathermap connected
		return this.http.get("../../assets/city.list.json")
		.map(res => res);
	}

	
}