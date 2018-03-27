import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
// import { TooltipModule } from 'ngx-bootstrap';

import { ROUTES }       from './layout.routes';
import { AlertModule, TooltipModule } from 'ngx-bootstrap';
import { ButtonsModule, BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule, AccordionModule } from 'ngx-bootstrap';
import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';
import { ChatSidebar } from './chat-sidebar/chat-sidebar.component';
import { ChatMessage } from './chat-sidebar/chat-message/chat-message.component';
import { SearchPipe } from './pipes/search.pipe';
import { NotificationLoad } from './notifications/notifications-load.directive';
import { Notifications } from './notifications/notifications.component';
import { DialogComponent } from './login/login.component';
import { AuthGuard } from './authGuard';
@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ROUTES,
    FormsModule,
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot()],
  declarations: [
    Layout,
    Sidebar,
    Navbar,
    ChatSidebar,
    SearchPipe,
    Notifications,
    NotificationLoad,
    ChatMessage,
    DialogComponent
  ],
  providers:[AuthGuard]
})
export class LayoutModule {
}
