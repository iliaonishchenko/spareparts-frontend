import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CartService } from '../cart.service';
import { FormControl } from '@angular/forms';
import {DetailsService} from '../details.service';
import {Order, OrdersService} from '../orders.service';
import {Payment, PaymentsService} from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Output() enterCartStage = new EventEmitter<boolean>();
  cardNumber;
  cardholder;
  expirationDate;
  cvc;
  constructor(private dService: DetailsService,
              private oService: OrdersService,
              private pService: PaymentsService) { }
  ngOnInit() {
    this.cardNumber = new FormControl('');
    this.cardholder = new FormControl('');
    this.expirationDate = new FormControl('');
    this.cvc = new FormControl('');
  }

  enterCartStageFunc(): void {
    this.enterCartStage.emit(true);
  }

  totalSum(): number {
    return CartService.getGoodsFromLocalCart().map(detail => detail.price).reduce((p1, p2) => p1 + p2);
  }

  doPayment(): void {
    console.log('processing payment with card number: ' + this.cardNumber.value);
    const detailIds = CartService.getGoodsFromLocalCart().map(detail => detail.detailId);
    this.dService.createDetailsBin(detailIds).subscribe(bin => {
      this.oService.createOrder(new Order(1, 1, bin.detailsBinId, 1111, 'card')).subscribe(order => {
        this.pService.createPayment(new Payment(1, order.orderId, true, 'No msg')).subscribe(payment => {
          console.log('we`ve created payment: ' + payment.toString());
        });
      });
    });

  }

}
