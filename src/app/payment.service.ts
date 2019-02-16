import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderId} from './orders.service';

@Injectable()
export class PaymentsService {
  constructor(private http: HttpClient) {}

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>('/api/payments', payment);
  }
}

export class Payment {
  orderId: OrderId;
  isFinished: Boolean;
  errorMsg: string;

  constructor(orderId: OrderId, isFinished: Boolean, errorMsg: string) {
    this.orderId = orderId;
    this.isFinished = isFinished;
    this.errorMsg = errorMsg;
  }
}
