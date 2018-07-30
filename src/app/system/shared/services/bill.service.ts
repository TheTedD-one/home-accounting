import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {map} from 'rxjs/operators';

@Injectable()

export class BillService {
  constructor(
    private http: HttpClient
  ) {}

  getBill(): Observable<Bill> {
    return this.http.get('http://localhost:3000/bill')
      .pipe(map((bill: Bill) => bill));
  }

  getCurrency() {
    //return this.http.get(``)
  }
}
