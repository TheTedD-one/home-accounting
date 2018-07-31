import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/bill.model';
import {map} from 'rxjs/operators';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()

export class BillService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('/bill');
  }

  getCurrency(): Observable<any> {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=198ba38a53a6c19cd31e439f1184142b&symbols=usd,rub`)
      .pipe(map((response: Response) => response));
  }
}
