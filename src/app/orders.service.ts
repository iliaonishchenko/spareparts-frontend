import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DetailBin, DetailBinId} from './details.service';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/orders', order);
  }

  getOrders(clientId: ClientId): Observable<Order[]> {
    return this.http.get<Order[]>('/api/orders/client_id/' + clientId.value);
  }

  sendMail(localOrder: LocalOrder): Observable<LocalOrder> {
    return this.http.post<LocalOrder>('/api/mails', localOrder);
  }

  getDetailBin(detailBinId: number): Observable<DetailBin> {
    return this.http.get<DetailBin>('/api/bins/' + detailBinId);
  }
}

export class LocalOrder {
  client: Client;
  text: string;

  constructor(client: Client, text: string) {
    this.client = client;
    this.text = text;
  }
}

export class Order {
  orderId: OrderId;
  clientId: ClientId;
  detailsBinId: DetailBinId;
  currentDate: number;
  paymentType: any;

  constructor(clientId: ClientId, detailsBinId: number, currentDate: number, paymentType: any) {
    this.clientId = clientId;
    this.detailsBinId = new DetailBinId(detailsBinId);
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

  constructor(clientId: ClientId, name: string, surname: string, email: string, isAdmin: boolean) {
    this.clientId = clientId;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}
