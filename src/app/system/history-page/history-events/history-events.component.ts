import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {HAEvent} from '../../shared/models/haEvent.model';

@Component({
  selector: 'ha-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: HAEvent[] = [];

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    });
  }

  getEventClass(event: HAEvent) {
    return {
      'label': true,
      'label-danger': event.type === 'outcome',
      'label-success': event.type === 'income',
    }
  }
}
