import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreateUser } from './createUser.component';

export const routes = [
  { path: '', component: CreateUser, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CreateUser
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CreateUserModule {
  static routes = routes;
}
