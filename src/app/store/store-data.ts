import { Participant } from '../../../shared/model/participant';
import { Thread } from '../../../shared/model/thread';
import { Message } from '../../../shared/model/message';
import { ApplicationState, INITIAL_APPLICATION_STATE } from 'app/store/application-state';
import { Action } from '@ngrx/store';
import { AllUserData } from '../../../shared/to/all-user-data';
import * as _ from 'lodash';

export interface StoreData {
    participants: { [key: number]: Participant };
    threads: { [key: number]: Thread };
    messages: { [key: number]: Message }
}

export const INITIAL_STORE_DATA: StoreData = {
    participants: {},
    threads: {},
    messages: {}
}

export class LoadUserThreadsAction implements Action {
    readonly type = StoreDataType.LOAD_USER_THREADS_ACTION;
    constructor(public payload: AllUserData) {
    }
}

export enum StoreDataType {
    LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION'
}

export function reducer(state: StoreData,
    action: LoadUserThreadsAction): StoreData {
    console.log(action.type);
    switch (action.type) {

        case StoreDataType.LOAD_USER_THREADS_ACTION:
            {
                const userData = action.payload

                const newState = Object.assign({}, state);

                newState.messages = _.keyBy(action.payload.messages, 'id');
                newState.participants = _.keyBy(action.payload.participants, 'id');
                newState.threads = _.keyBy(action.payload.threads, 'id');

                return newState;
            }

        default:
            return state;
    }
}