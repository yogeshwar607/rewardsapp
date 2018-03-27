import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CustomerPage } from './customer.component.ts';
import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';

export const routes = [
  { path: '', component: CustomerPage, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule ],
  declarations: [ CustomerPage ]
})
export class CustomerModule {
  static routes = routes;
}
