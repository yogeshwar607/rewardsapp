import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { OrderDetailsPage } from './orderDetails.component';
import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';
import { DialogComponent } from './addInterest/addInterest.component';

export const routes = [
  { path: '', component: OrderDetailsPage, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule ],
  declarations: [ OrderDetailsPage,DialogComponent ]
})
export class OrderDetailsModule {
  static routes = routes;
}
