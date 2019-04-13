import {Component, Directive, Input, OnInit} from '@angular/core';
import {DetailsService, SupplierId} from '../details.service';
import { Car, CarId } from '../app.component';
import {LocalStorageService} from '../localstorage.service';
import {CartService} from '../cart.service';
import {Client} from '../orders.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';

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
  addDetailForm: FormGroup;

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

  openAddWindow(addNewDetail) {
    this.addDetailForm = new FormGroup({
        addDetailName: new FormControl('', Validators.required),
      addDetailInfo: new FormControl('', Validators.required),
      addDetailPrice: new FormControl( '', [Validators.required, Validators.required, Validators.min(1)]),
      addDetailYear: new FormControl( '', [Validators.required, Validators.required, Validators.min(1950), Validators.max(2020)]),
      addDetailSupplierId: new FormControl( '', [Validators.required])
      });
    this.modalService.open(addNewDetail, {ariaLabelledBy: 'modal-new-detail'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  openChangeWindow(content, detail: Detail) {
    this.currDetail = detail;
    this.updatedDetailForm = new FormGroup({
      updatedDetailName: new FormControl(this.currDetail.name, Validators.required),
      updatedDetailInfo: new FormControl(this.currDetail.info, Validators.required),
      updatedDetailPrice: new FormControl(this.currDetail.price, [Validators.required, Validators.min(1)]),
      updatedDetailYear: new FormControl(this.currDetail.year, [Validators.required, Validators.min(1950), Validators.max(2020)])
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  get changingDetailName () {
    return this.updatedDetailForm.get('updatedDetailName');
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

    this.detailService.updateDetail(this.currDetail).subscribe(updatedDetail => {
      this.currDetail = updatedDetail;
      location.reload();
    });
    // this.detailService.getDetailById(this.currDetail.detailId);
    // this.detailService.getDetailsByCarId({'value': 2});
    console.log(this.updatedDetailForm.value.updatedDetailName);
  }

  addDetail() {
    const supplierId = new SupplierId(this.addDetailForm.value.addDetailSupplierId);
    const name = this.addDetailForm.value.addDetailName;
    const info = this.addDetailForm.value.addDetailInfo;
    const price = this.addDetailForm.value.addDetailPrice;
    const year = this.addDetailForm.value.addDetailYear;
    const newDetail = new Detail(supplierId, name, year, info, price, this.car.carId);

    this.detailService.createNewDetail(newDetail).subscribe(justCreatedDetail => {
      console.log(justCreatedDetail);
      location.reload();
    });
  }

  deleteDetail(detailId: DetailId) {
    this.detailService.deleteDetail(detailId).subscribe(detail => console.log(detail.detailId));
    location.reload();
  }
}

export interface DetailId {
  value: number;
}

export class Detail {
  detailId?: DetailId;
  supplierId: SupplierId;
  name: String;
  year: number;
  info: String;
  price: number;
  carId: CarId;

  constructor(supplierId: SupplierId, name: string, year: number, info: string, price: number, carId: CarId) {
    this.supplierId = supplierId;
    this.name = name;
    this.year = year;
    this.info = info;
    this.price = price;
    this.carId = carId;
  }
}
