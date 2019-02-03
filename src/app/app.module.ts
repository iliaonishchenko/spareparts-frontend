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
import { CartComponent } from './cart/cart.component';
import {CartService} from './cart.service';
import { PrepaymentComponent } from './prepayment/prepayment.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AuthComponent,
    CartComponent,
    PrepaymentComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [CarsService, DetailsService, AuthenticationService, CartService],
  bootstrap: [AppComponent, AuthComponent, CartComponent, PrepaymentComponent, PaymentComponent]
})
export class AppModule { }
