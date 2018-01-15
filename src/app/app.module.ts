import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ThreadsService } from "./services/threads.service";
import { StoreModule, ActionReducerMap } from "@ngrx/store";
import { INITIAL_APPLICATION_STATE, ApplicationState, reducers } from 'app/store/application-state';
import { Action } from 'rxjs/scheduler/Action';
import { StoreData } from 'app/store/store-data';

import * as _ from 'lodash';

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.forRoot(reducers , {initialState : INITIAL_APPLICATION_STATE})
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
