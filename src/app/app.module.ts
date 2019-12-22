import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { FormsModule }                          from '@angular/forms';
import { OrderModule }                          from 'ngx-order-pipe';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { HttpClientModule }     from '@angular/common/http';
import { AgmCoreModule }        from '@agm/core';

import { AppComponent }             from './app.component';
import { WeatherTableComponent }    from './components/weather-table/weather-table.component';
import { CityInformationComponent } from './components/city-information/city-information.component';
import { SearchComponent }          from './components/search/search.component';
import { NotFoundComponent }        from './components/not-found/not-found.component';

import { PagerService }             from './services/index';
import { WeatherService }           from './services/weather.service';
import { SearchService }            from './services/search.service';



const appRoutes: Routes = [
  {
    // Root AppComponent
    path: '',
    redirectTo: '/cities',
    pathMatch: 'full' 
  },
  { 
    path: 'cities',
    component: WeatherTableComponent 
  },
  {
    path: 'city-information/:id',
    component: CityInformationComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]


@NgModule({
  declarations: [
    AppComponent, 
    WeatherTableComponent,
    CityInformationComponent,
    SearchComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OrderModule,
    RouterModule.forRoot(appRoutes,{ useHash: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWo3bVAkjs23k4Pr7LJdguAqBHRHZxDBA' 
    })
  ],
  providers: [ WeatherService, PagerService, SearchService ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
