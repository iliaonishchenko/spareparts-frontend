import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CarsService } from './cars.service';
import { DetailsComponent } from './details/details.component';
import { DetailsService } from './details.service';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [CarsService, DetailsService, AuthenticationService],
  bootstrap: [AppComponent, AuthComponent]
})
export class AppModule { }
