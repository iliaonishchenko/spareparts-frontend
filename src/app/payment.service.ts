import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable
export class PaymentsService {
  constructor(private http: HttpClient) {}

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post('/api/payments', payment);
  }
}

export class Payment {
  constructor(id: number, orderId: number, isFinished: Boolean, errorMsg: string) {}
}
