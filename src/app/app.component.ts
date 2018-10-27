import { Component, OnInit } from '@angular/core';
import { CarsService} from './cars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spareshop-frontend';

  constructor(private carsService: CarsService) {}

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
}

export interface Car {
  carId: number;
  mark: string;
  model: string;
  year: number;
  bodyStyle: string;
}
