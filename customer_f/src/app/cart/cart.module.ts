import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CartPage } from './cart.component.ts';
// import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule } from 'ngx-bootstrap';
import { DialogComponent } from './login/login.component';

export const routes = [
  { path: '', component: CartPage, pathMatch: 'full' }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule ],
  declarations: [ CartPage,DialogComponent ]
})
export class CartModule {
  static routes = routes;
}
