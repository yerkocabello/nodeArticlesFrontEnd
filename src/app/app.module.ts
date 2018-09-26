import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {routing} from './app.routing';
import {ArticlesService} from './services/articles.service';
import {Data} from './providers/data';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  providers: [ArticlesService, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
