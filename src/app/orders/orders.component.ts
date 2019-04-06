import { Component, OnInit } from '@angular/core';
import {Client, Order, OrdersService} from '../orders.service';
import {LocalStorageService} from '../localstorage.service';
import {DetailBin, DetailsService} from '../details.service';
import {Detail} from '../details/details.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private oService: OrdersService, private dService: DetailsService) { }

  extendedOrders: ExtendedOrder[] = [];

  getOrders() {
    const client: Client = JSON.parse(LocalStorageService.get('currentUser')) as Client;
    this.oService.getOrders(client.clientId).subscribe((ordersSeq: Order[]) => {
      console.log(ordersSeq);
      ordersSeq.map(order => {
        const details = [];
        console.log('working with order: ' + order.orderId);
        this.oService.getDetailBin(order.detailsBinId.value).subscribe(detailBin => {
          console.log('working with detail bin: ' + detailBin.detailsBinId.value);
          detailBin.detailIds.map(detailId => this.dService.getDetailById(detailId).subscribe(detail => {
            details.push(detail);
          }));
        });
        this.extendedOrders.push(new ExtendedOrder(order, details));
      });
    });
  }

  createDate(millis: number) {
    return new Date(millis);
  }

  ngOnInit() {
    // extendedOrders = [];
    this.getOrders();
  }
}

export class ExtendedOrder {
  order: Order;
  details: Detail[];
  constructor(order: Order, details: Detail[]) {
    this.order = order;
    this.details = details;
  }
}
