import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { InterestsPage } from './interests.component.ts';
import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';
import { DialogComponent } from './addInterest/addInterest.component';
// import {SelectModule} from 'ng2-select';

export const routes = [
  { path: '', component: InterestsPage, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule ],
  declarations: [ InterestsPage,DialogComponent ]
})
export class InterestsModule {
  static routes = routes;
}
