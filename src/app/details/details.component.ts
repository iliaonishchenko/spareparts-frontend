import { Component, Input, OnInit } from '@angular/core';
import { DetailsService } from '../details.service';
import { Car, CarId } from '../app.component';
import {LocalStorageService} from '../localstorage.service';
import {CartService} from '../cart.service';
import {Client} from '../orders.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() car: Car;
  constructor(private detailService: DetailsService, private modalService: NgbModal) {}

  availableDetails: Detail[];
  client: Client;
  closeResult: string;
  currDetail: Detail;
  updatedDetailForm: FormGroup;

  getDetailsByCarId(carId: CarId) {
    this.detailService.getDetailsByCarId(carId).subscribe((detailSeq: Detail[]) => {
      console.log(detailSeq);
      console.log('curr client: ' + LocalStorageService.get('currentUser'));
      this.availableDetails = detailSeq;
    });
  }

  isDefined(value: any): boolean {
    return typeof value !== 'undefined';
  }

  ngOnInit() {
    this.getDetailsByCarId(this.car.carId);
    this.client = JSON.parse(LocalStorageService.get('currentUser')) as Client;
    // this.myGroup = new FormGroup({
    //   firstName: new FormControl()
    // });
  }

  addDetailToCart(detail: Detail) {
    CartService.addToCartLocal(detail);
  }

  openChangeWindow(content, detail: Detail) {
    this.currDetail = detail;
    this.updatedDetailForm = new FormGroup({
      updatedDetailName: new FormControl(this.currDetail.name),
      updatedDetailInfo: new FormControl(this.currDetail.info),
      updatedDetailPrice: new FormControl(this.currDetail.price),
      updatedDetailYear: new FormControl(this.currDetail.year)
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  updateDetail() {
    this.currDetail.name = this.updatedDetailForm.value.updatedDetailName;
    this.currDetail.info = this.updatedDetailForm.value.updatedDetailInfo;
    this.currDetail.price = this.updatedDetailForm.value.updatedDetailPrice;
    this.currDetail.year = this.updatedDetailForm.value.updatedDetailYear;

    this.detailService.updateDetail(this.currDetail).subscribe(updatedDetail => this.currDetail = updatedDetail);
    // this.detailService.getDetailById(this.currDetail.detailId);
    // this.detailService.getDetailsByCarId({'value': 2});
    console.log(this.updatedDetailForm.value.updatedDetailName);
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
