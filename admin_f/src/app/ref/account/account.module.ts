import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { ButtonsModule, BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule, AccordionModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AccountPage } from './account.component.ts';
// import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';

export const routes = [
  { path: '', component: AccountPage, pathMatch: 'full' }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule ,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot()],
  declarations: [ AccountPage ]
})
export class AccountModule {
  static routes = routes;
}
