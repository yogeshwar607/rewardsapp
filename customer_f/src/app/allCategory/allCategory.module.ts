import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AllCategoryPage } from './allCategory.component';
// import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';

export const routes = [
  { path: '', component: AllCategoryPage, pathMatch: 'full' }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule ],
  declarations: [ AllCategoryPage ]
})
export class AllCategoryModule {
  static routes = routes;
}
