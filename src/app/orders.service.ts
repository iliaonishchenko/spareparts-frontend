import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/orders', order);
  }
}

export class Order {
  orderId: number;
  clientId: number;
  detailsBinId: number;
  currentDate: number;
  paymentType: string;

  constructor(orderId: number, clientId: number, detailsBinId: number, currentDate: number, paymentType: string) {
    this.orderId = orderId;
    this.clientId = clientId;
    this.detailsBinId = detailsBinId;
    this.currentDate = currentDate;
    this.paymentType = paymentType;
  }
}
