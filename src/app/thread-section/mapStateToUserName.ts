import { ApplicationState } from 'app/store/application-state';

export function userNameSelector(state: ApplicationState): string {
    const currentUserId = state.UiState.userId,
        currentParticipant = state.storeData.participants[currentUserId];

    if (!state.UiState.userId) {
        return '';
    }
    return currentParticipant.name
}
