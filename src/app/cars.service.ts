import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './app.component';
import {Observable} from 'rxjs';

@Injectable()
export class CarsService {
  constructor(private http: HttpClient) {
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:8080/cars');
  }
}
