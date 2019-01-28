import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../details.service';
import { Car, CarId } from '../app.component';
import {LocalStorageService} from '../localstorage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() car: Car;
  constructor(private detailService: DetailsService) {}

  availableDetails: Detail[];

  getDetailsByCarId(carId: CarId) {
    this.detailService.getDetailsByCarId(carId).subscribe((detailSeq: Detail[]) => {
      console.log(detailSeq);
      console.log('lurr user: ' + LocalStorageService.get('currentUser'));
      this.availableDetails = detailSeq;
    });
  }

  isDefined(value: any): boolean {
    return typeof value !== 'undefined';
  }

  ngOnInit() {
    console.log('car we have: ' + this.car);
    this.getDetailsByCarId(this.car.carId);
  }
}

export interface DetailId {
  value: number;
}

export interface Detail {
  detailId: DetailId;
  supplierId: number;
  name: String;
  year: number;
  info: String;
  price: number;
}
