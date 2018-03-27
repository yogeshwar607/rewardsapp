import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AddBrandPage } from './addBrand.component.ts';
import { Widget } from '../layout/widget/widget.directive';
import { DataTableModule } from 'angular2-datatable';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

export const routes = [
  { path: '', component: AddBrandPage, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes),DataTableModule,FormsModule, 
  FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()],
  declarations: [ AddBrandPage ]
})
export class AddBrandModule {
  static routes = routes;
}
