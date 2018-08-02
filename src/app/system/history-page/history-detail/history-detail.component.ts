import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {mergeMap} from 'rxjs/internal/operators';
import {HAEvent} from '../../shared/models/haEvent.model';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ha-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;

  event: HAEvent;
  category: Category;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub1 = this.activatedRoute.params
      .pipe(
        mergeMap((params: Params) => this.eventsService.getEventsById(params['id'])),
        mergeMap((event: HAEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event['category']);
        })
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
