import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {routing} from './app.routing';
import {ArticlesService} from './services/articles.service';
import {Data} from './providers/data';
import {HttpClientModule} from '@angular/common/http';
import { CustomDateFormatPipePipe } from './custom-date-format-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomDateFormatPipePipe
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
