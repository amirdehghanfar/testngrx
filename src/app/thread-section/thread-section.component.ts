import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { ApplicationState } from 'app/store/application-state';
import { Store } from '@ngrx/store';
import { LoadUserThreadsAction } from 'app/store/store-data';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import { Thread } from '../../../shared/model/thread';
import { stateToThreadSummariesSelector } from 'app/thread-section/stateToThreadSummariesSelector';
import { userNameSelector } from 'app/thread-section/mapStateToUserName';
import { mapStateToUnreadmessagesCounter } from 'app/thread-section/mapStateToUnreadmessagesCounter';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummary$: Observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService,
    private store: Store<ApplicationState>) {

    this.userName$ = store.select(userNameSelector);

    this.unreadMessagesCounter$ = store.map(mapStateToUnreadmessagesCounter);

    this.threadSummary$ = this.store.select(stateToThreadSummariesSelector)
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
