import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Detail} from '../details/details.component';
import {CartService} from '../cart.service';
import {CartComponent} from '../cart/cart.component';
import {DetailsService, Supplier, SupplierId} from '../details.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart-internal',
  templateUrl: './cart-internal.component.html',
  styleUrls: ['./cart-internal.component.css']
})
export class CartInternalComponent implements OnInit {

  @Output() goToPaymentStage = new EventEmitter<boolean>();
  constructor(private detailService: DetailsService) { }

  ngOnInit() {
  }

  getSupplierById(supplierId: number): Observable<Supplier> {
    if (supplierId !== undefined && supplierId !== null) {
      return this.detailService.getSupplierById(new SupplierId(supplierId));
    }
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

  goToPaymentStageFunc() {
    this.goToPaymentStage.emit(true);
  }

  totalSum(): number {
    if (!this.isCartEmpty()) {
      return CartService.getGoodsFromLocalCart().map(detail => detail.price).reduce((p1, p2) => p1 + p2);
    } else {
      return 0;
    }
  }
}
