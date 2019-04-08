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

  createDetailsBin(detailsId: DetailId[]): Observable<DetailBin> {
    return this.http.post<DetailBin>('/api/bins', new DetailBin(detailsId));
  }

  getSupplierById(supplierId: SupplierId): Observable<Supplier> {
    return this.http.get<Supplier>('/api/suppliers/' + supplierId.value);
  }

  getDetailById(detailId: DetailId): Observable<Detail> {
    console.log('sending request');
    return this.http.get<Detail>('/api/details/' + detailId.value);
  }

  updateDetail(detail: Detail): Observable<Detail> {
    return this.http.put<Detail>('/api/details', detail);
  }
}

export class DetailBinId {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class DetailBin {
  detailsBinId?: DetailBinId;
  detailIds: DetailId[];
  constructor(detailIds: DetailId[]) {
    this.detailIds = detailIds;
  }
}

export class SupplierId {
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}
export class Supplier {
  supplierId: SupplierId;
  name: string;
  account: number;
  address: string;
  link: String;
  constructor(supplierId: SupplierId, name: string, account: number, address: string, link: string) {
    this.supplierId = supplierId;
    this.name = name;
    this.account = account;
    this.address = address;
    this.link = link;
  }
}
