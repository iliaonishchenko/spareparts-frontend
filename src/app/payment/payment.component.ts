import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @Output() enterCartStage = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  enterCartStageFunc(): void {
    this.enterCartStage.emit(true);
  }

}
