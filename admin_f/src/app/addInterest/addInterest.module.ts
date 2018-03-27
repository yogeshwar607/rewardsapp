import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AddInterestPage } from './addInterest.component';
import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';


export const routes = [
  { path: '', component: AddInterestPage, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule],
  declarations: [ AddInterestPage ]
})
export class AddInterestModule {
  static routes = routes;
}
