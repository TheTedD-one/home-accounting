import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {HAEvent} from '../../shared/models/haEvent.model';
import * as moment from 'moment';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ha-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];

  sub1: Subscription;
  sub2: Subscription;
  message: Message;
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'},
  ];

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const {desc, category, type} = form.value;
    let {amount} = form.value;
    if (amount < 0) {
      amount *= -1;
    }

    const event = new HAEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), desc);

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;

        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage('На вашем счете недостаточно средств.');
            form.setValue({
              amount: 0,
              desc: ' ',
              category: 1,
              type: 'outcome'
            });
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({value, currency: bill.currency})
          .pipe(mergeMap(() => this.eventsService.addEvent(event)))
          .subscribe(() => {
            form.setValue({
              amount: 0,
              desc: ' ',
              category: 1,
              type: 'outcome'
            });
          });
      });
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }
}
