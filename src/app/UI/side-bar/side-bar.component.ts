import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategorysAction } from '../../store/category/category.actions';
import { Observable } from 'rxjs';
import { CategoryState } from '../../store/category/category.state';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Output() categorySelected = new EventEmitter<string>(); // Add this line

  categories$: Observable<any>;
  selectCategory(cate: any) {
    this.categorySelected.emit(cate);
  }
  constructor(private store: Store) {
    this.categories$ = this.store.select(CategoryState.categories);
    this.store.dispatch(new CategorysAction.GetCategory());
  }
  groups = [
    {
      name: 'Group 1',
    },
    {
      name: 'Group 2',
    },
    {
      name: 'Group 3',
    },
    {
      name: 'Group 4',
    },
  ];
}
