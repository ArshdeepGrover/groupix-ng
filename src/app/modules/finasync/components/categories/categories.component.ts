import { Component } from '@angular/core';
import { ICategory } from 'src/app/modules/finasync/models/category.model';
import { CategoryService } from 'src/app/modules/finasync/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: ICategory[] = [];
  newCategory: Partial<ICategory> = {};

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.index().subscribe((data) => (this.categories = data));
  }

  addCategory() {
    this.categoryService.create(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = {};
    });
  }

  updateCategory(category: ICategory) {
    this.categoryService
      .update(category.id, category)
      .subscribe(() => this.loadCategories());
  }

  deleteCategory(category: ICategory) {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${category.name}?`
    );
    if (isConfirmed) {
      this.categoryService
        .delete(category.id)
        .subscribe(() => this.loadCategories());
    }
  }
}
