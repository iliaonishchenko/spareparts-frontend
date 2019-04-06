import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CartService } from '../cart.service';
import { FormControl } from '@angular/forms';
import {DetailBinId, DetailsService} from '../details.service';
import {Client, ClientId, LocalOrder, Order, OrdersService} from '../orders.service';
import {Payment, PaymentsService} from '../payment.service';
import {LocalStorageService} from '../localstorage.service';
import {Detail} from '../details/details.component';

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

  paymentDone = false;

  private static composeTextMessage(client: Client, details: Detail[]): string {
    const detailsString = details.map(detail => `${detail.name} (${detail.year}): ${detail.price}`).join('\n');
    return `Здравствуйте, ${client.name}!\
    \n Вы оформили заказ в магазине SpareShop!\
    \n Ваш заказ включает в себя следующие товары:\
    \n ${detailsString}\
    \n Служба доставки свяжется с вами в день доставки. \
    \n Спасибо за заказ на нашем сайте`;
  }

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
    const currClient: Client = JSON.parse(LocalStorageService.get('currentUser')) as Client;
    console.log('processing payment with card number: ' + this.cardNumber.value);
    const detailIds = CartService.getGoodsFromLocalCart().map(detail => detail.detailId);
    this.dService.createDetailsBin(detailIds).subscribe(bin => {
      this.oService.createOrder(new Order(currClient.clientId, bin.detailsBinId.value, new Date().getTime(), {'Online': ''}))
        .subscribe(order => {
          const currPayment = new Payment(order.orderId, true, 'No msg');
          console.log('we created payment ' + JSON.stringify(currPayment));
          this.pService.createPayment(currPayment).subscribe(payment => {
            console.log('we`ve created payment: ' + payment.toString());
            CartService.cleanCart();
            this.paymentDone = true;
            location.reload();
          });
        });
    });
  }

  sendMail(): void {
    const details: Detail[] = CartService.getGoodsFromLocalCart();
    const currClient: Client = JSON.parse(LocalStorageService.get('currentUser')) as Client;
    const mailText: string = PaymentComponent.composeTextMessage(currClient, details);
    console.log('we have the following text: ' + mailText);

    const detailIds = CartService.getGoodsFromLocalCart().map(detail => detail.detailId);
    this.dService.createDetailsBin(detailIds).subscribe(bin => {
      this.oService.createOrder(new Order(currClient.clientId, bin.detailsBinId.value, new Date().getTime(), {'Online': ''}))
        .subscribe(order => {
          const currPayment = new Payment(order.orderId, true, 'No msg');
          console.log('we created payment ' + JSON.stringify(currPayment));
          this.pService.createPayment(currPayment).subscribe(payment => {
            console.log('we`ve created payment: ' + payment.toString());
            this.oService.sendMail(new LocalOrder(currClient, mailText)).subscribe(rLocalOrder => {
              console.log('we got answer from server: ' + rLocalOrder);
              CartService.cleanCart();
              location.reload();
            });
          });
        });
    });
  }
}
