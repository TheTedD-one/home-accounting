import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {HAEvent} from '../shared/models/haEvent.model';
import * as moment from 'moment';

@Component({
  selector: 'ha-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isFilterVisible = false;
  isLoaded = false;

  categories: Category[] = [];
  events: HAEvent[] = [];
  filteredEvents: HAEvent[] = [];

  chartData = [];

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe(([categories, events]) => {
      this.categories = categories;
      this.events = events;

      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvents = this.filteredEvents
        .filter((event) => event.category === cat.id && event.type === 'outcome');

      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  onFilterApply(data) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(data.period).startOf('d');
    const endPeriod = moment().endOf(data.period).startOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return data.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return data.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }
}
