import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-city-information',
  templateUrl: './city-information.component.html', 
  styleUrls: ['./city-information.component.scss']
})

export class CityInformationComponent implements OnInit {
  
  titleCity = 'Reference Forecast';
  dataLocation: any = {};
  actionToggle: boolean = false;

  // google maps zoom level
  zoom: number = 6;
  iconUrl: any;
  // Start Position
  lat: number;
  lng: number;

  constructor(private http: HttpClient,
              private weatherService: WeatherService,
              private activatedRoute: ActivatedRoute,
              private location: Location) { }
  
  ngOnInit() {
      this.activatedRoute.params.subscribe(params => this.weatherService.urlApi(params['id']));
 
      this.weatherService.cityWeatherForecast().subscribe((dataLocation) => {
        console.log(dataLocation);
        this.dataLocation = dataLocation;
      });

      this.iconUrl = {
        url: '../assets/img/pin_map.png',
        scaledSize: {
          height: 50,
          width: 50
        } 
      };
  }

  goBack(): void {
    this.location.back();
  }

  toggleClick(): void {
    this.actionToggle = !this.actionToggle;
  }


}