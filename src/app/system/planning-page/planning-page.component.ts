import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {Category} from '../shared/models/category.model';
import {HAEvent} from '../shared/models/haEvent.model';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'ha-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: HAEvent[] = [];

  sub1: Subscription;

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe(([bill, categories, events]) => {
      this.bill = bill;
      this.categories = categories;
      this.events = events;
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return categoryEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 50 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }
}
