import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ha-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<Category>();

  sub1: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {
    const {name} = form.value;
    let {capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }
    const category = new Category(name, +capacity);

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((data: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(data);
      });
  }
}
