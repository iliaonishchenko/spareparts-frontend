import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Detail, DetailId} from './details/details.component';
import {CarId} from './app.component';

@Injectable()
export class DetailsService {
  constructor(private http: HttpClient) {}

  getDetailsByCarId(carId: CarId): Observable<Detail[]> {
    console.log('we have carId: ' + carId.value);
    return this.http.get<Detail[]>('/api/details/car_id/' + carId.value);
  }
}
