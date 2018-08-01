import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {Observable, Subscription} from 'rxjs';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'ha-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  sub1: Subscription;
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
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

    const category = new Category(name, capacity, +this.currentCategoryId);
    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((data: Category) => {
        this.onCategoryEdit.emit(data);
        this.message.text = 'Категория успешно отредактирована.';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }



}
