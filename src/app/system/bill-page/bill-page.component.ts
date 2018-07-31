import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, pipe, Subscription, combineLatest} from 'rxjs';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'ha-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(),
    ).subscribe(([bill, currency]) => {
      console.log(bill, currency);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
