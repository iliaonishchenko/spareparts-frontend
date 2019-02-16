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
  orderId: OrderId;
  clientId: ClientId;
  detailsBinId: number;
  currentDate: number;
  paymentType: any;

  constructor(clientId: ClientId, detailsBinId: number, currentDate: number, paymentType: any) {
    this.clientId = clientId;
    this.detailsBinId = detailsBinId;
    this.currentDate = currentDate;
    this.paymentType = paymentType;
  }
}

export class OrderId {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class ClientId {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class Client {
  clientId: ClientId;
  name: string;
  surname: string;
  email: string;
  isAdmin: Boolean;
}
