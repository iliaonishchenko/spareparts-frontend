import { Component, OnInit } from '@angular/core';
import {Client, Order, OrdersService} from '../orders.service';
import {LocalStorageService} from '../localstorage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private oService: OrdersService) { }

  orders: Order[];

  getOrders() {
    const client: Client = JSON.parse(LocalStorageService.get('currentUser')) as Client;
    this.oService.getOrders(client.clientId).subscribe((ordersSeq: Order[]) => {
      console.log(ordersSeq);
      this.orders = ordersSeq;
    });
  }

  createDate(millis: number) {
    return new Date(millis);
  }

  ngOnInit() {
    this.getOrders();
  }

}
