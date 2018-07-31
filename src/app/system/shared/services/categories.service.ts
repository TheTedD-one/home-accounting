import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';

@Injectable()

export class CategoriesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('/categories', category);
  }
}
