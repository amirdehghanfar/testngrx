import { UiState, INITIAL_UI_STATE } from "app/store/ui-state";
import { StoreData, INITIAL_STORE_DATA } from "app/store/store-data";
import { ActionReducerMap } from "@ngrx/store";
import * as fromStoreData from "app/store/store-data";


export interface ApplicationState {
    UiState:UiState;
    storeData: fromStoreData.StoreData;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
    UiState: INITIAL_UI_STATE,
    storeData: INITIAL_STORE_DATA
}

export interface State {
    storeData: fromStoreData.StoreData;
}

export const reducers: ActionReducerMap<ApplicationState> = {
    storeData: fromStoreData.reducer,
    UiState: null
}