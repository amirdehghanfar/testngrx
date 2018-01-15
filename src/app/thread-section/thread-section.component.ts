import { Component, OnInit } from '@angular/core';
import { ThreadsService } from "../services/threads.service";
import { ApplicationState } from 'app/store/application-state';
import { Store } from '@ngrx/store';
import { LoadUserThreadsAction } from 'app/store/store-data';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;

  constructor(private threadsService: ThreadsService,
    private store: Store<ApplicationState>) {

    this.userName$ = store
      .skip(1)
      .map(this.mapStateToUserName);
  }

  mapStateToUserName(state: ApplicationState): string {
    return state.storeData.participants[state.UiState.userId].name
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
