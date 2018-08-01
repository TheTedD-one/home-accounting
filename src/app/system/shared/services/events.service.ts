import {BaseApi} from '../../../shared/core/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HAEvent} from '../models/haEvent.model';

@Injectable()

export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: HAEvent): Observable<HAEvent> {
    return this.post('/events', event);
  }
}