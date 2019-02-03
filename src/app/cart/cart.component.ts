import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {Detail} from '../details/details.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  isNext: Boolean = false;

  ngOnInit() {
    this.isNext = false;
  }

  isCartEmpty(): Boolean {
    const details: Detail[] = CartService.getGoodsFromLocalCart();
    const isEmpty: Boolean = (details === undefined || details === null || details.length === 0 );
    return isEmpty;
  }

  getCartContent(): Detail[] {
    return CartService.getGoodsFromLocalCart();
  }

  removeFromCart(detail: Detail): Boolean {
    return CartService.removeFromCartLocal(detail);
  }

  doNext(): void {
    this.isNext = true;
  }
}
