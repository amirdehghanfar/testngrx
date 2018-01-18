import { ApplicationState } from 'app/store/application-state';
import { Thread } from '../../../shared/model/thread';
import { ThreadSummaryVM } from 'app/thread-section/thread-summary.vm';
import * as _ from 'lodash';

export function stateToThreadSummariesSelector(state: ApplicationState) {
    const threads = _.values(state.storeData.threads);

    return threads.map(_.partial(mapThreadToThreadSummary, state))
  }

 export function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
    const names = _.keys(thread.participants).map(
      participantId => state.storeData.participants[participantId].name
    )

    const lastMessageId = _.last(thread.messageIds),
      lastMessage = state.storeData.messages[lastMessageId];

    return {
      id: thread.id,
      participantNames: _.join(names, ','),
      lastMessageText: lastMessage.text,
      timestamp: lastMessage.timestamp
    }
  }
