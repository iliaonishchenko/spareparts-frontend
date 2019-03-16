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
import { PaymentComponent } from './payment/payment.component';
import { CartInternalComponent } from './cart-internal/cart-internal.component';
import {OrdersService} from './orders.service';
import {PaymentsService} from './payment.service';
import { OrdersComponent } from './orders/orders.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    AuthComponent,
    CartComponent,
    PaymentComponent,
    CartInternalComponent,
    OrdersComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [CarsService, DetailsService, AuthenticationService, CartService, OrdersService, PaymentsService],
  bootstrap: [AppComponent, AuthComponent, CartComponent, OrdersComponent, RegistrationComponent]
})
export class AppModule { }
