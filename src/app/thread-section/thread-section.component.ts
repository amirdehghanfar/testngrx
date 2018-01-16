import { Component, OnInit } from '@angular/core';
import { ThreadsService } from "../services/threads.service";
import { ApplicationState } from 'app/store/application-state';
import { Store } from '@ngrx/store';
import { LoadUserThreadsAction } from 'app/store/store-data';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;

  constructor(private threadsService: ThreadsService,
    private store: Store<ApplicationState>) {

    this.userName$ = store
      .skip(1)
      .map(this.mapStateToUserName);

    this.unreadMessagesCounter$ = store.skip(1)
      .map(this.mapStateToUnreadmessagesCounter)
  }

  mapStateToUserName(state: ApplicationState): string {
    return state.storeData.participants[state.UiState.userId].name
  }

  mapStateToUnreadmessagesCounter(state: ApplicationState): number {
    const currentUserId = state.UiState.currentThreadId;
    return _.values(state.storeData.threads)
      .reduce(
      (acc, thread) => {
        return acc + thread.participants[currentUserId]

      }
      , 0
      )
  }

  ngOnInit() {

    this.threadsService.loadUserThreads()
      .subscribe(
      allUserData => this.store.dispatch(
        new LoadUserThreadsAction(allUserData)
      )
      )
  }

}
