import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, combineLatest} from 'rxjs';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';
import {delay} from 'rxjs/internal/operators';

@Component({
  selector: 'ha-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  allSub: Subscription;
  currencySub: Subscription;

  bill: Bill;
  currency: any;

  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.allSub = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency(),
    ).subscribe(([bill, currency]) => {
      this.bill = bill;
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    if (this.allSub) {
      this.allSub.unsubscribe();
    }

    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }

  onRefresh() {
    this.isLoaded = false;
    this.currencySub = this.billService.getCurrency()
      .pipe(delay(2000))
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

}
