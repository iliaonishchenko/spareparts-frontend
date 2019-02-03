import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  cartStage: Boolean = true;
  paymentStage: Boolean = false;

  ngOnInit() {
    this.cartStage = true;
    this.paymentStage = false;
  }

  enterCartStage(): void {
    this.cartStage = true;
    this.paymentStage = false;
  }

  enterPaymentStage(): void {
    this.cartStage = false;
    this.paymentStage = false;
  }

  isCartStage(): Boolean { return this.cartStage; }
  isPaymentStage(): Boolean { return this.paymentStage; }
}
