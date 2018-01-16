import { ApplicationState } from 'app/store/application-state';
import { Action } from '@ngrx/store';

export interface UiState {
    userId: number;
    currentThreadId: number;
}

export const INITIAL_UI_STATE: UiState = {
    userId: 1,
    currentThreadId: 1
}

export function reducer(state: UiState, action: Action) {
    return state
}
