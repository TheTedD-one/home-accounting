import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'ha-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  // @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;

  constructor() { }

  ngOnInit() {
    // this.onCategoryChange();
  }

  onSubmit(form: NgForm) {
    // console.log(form);
  }

  onCategoryChange() {
    console.log(this.categories);
    // this.currentCategory = this.categories
    //   .find(c => c.id === +this.currentCategory.id);
  }
}
