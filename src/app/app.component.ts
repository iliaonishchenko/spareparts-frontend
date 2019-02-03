import {Component, OnInit} from '@angular/core';
import {CarsService} from './cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spareshop-frontend';

  paymentsStageCart = true;
  paymentStagePrepayment = false;
  paymentStagePayment = false;

  selectedCar: Car = {carId: {value: -1} as CarId } as Car;

  constructor(private carsService: CarsService) {
  }

  availableCars: Car[];

  getAllCars() {
    this.carsService.getAllCars().subscribe((carSeq: Car[]) => {
      console.log(carSeq);
      this.availableCars = carSeq;
    });
  }

  isDefined(value: any): boolean {
    return typeof value !== 'undefined';
  }

  // noinspection TsLint
  ngOnInit() {
    this.getAllCars();
  }

  onSelectCar(car) {
    this.selectedCar = car;
  }
}
export interface CarId {
  value: number;
}
export interface Car {
  carId: CarId;
  mark: string;
  model: string;
  year: number;
  bodyStyle: string;
  pic: string;
}

export interface Credentials {
  email: string;
  passwordHash: string;
}
