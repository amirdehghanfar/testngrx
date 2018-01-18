import { ApplicationState } from 'app/store/application-state';
import * as _ from 'lodash';

  export function mapStateToUnreadmessagesCounter(state: ApplicationState): number {

    const currentUserId = state.UiState.currentThreadId;

    return _.values(state.storeData.threads)
      .reduce(
      (acc, thread) => {
        return acc + (thread.participants[currentUserId] || 0)
      }
      , 0
      )
  }
