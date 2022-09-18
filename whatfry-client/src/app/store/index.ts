import { ActionReducerMap } from "@ngrx/store";
import { ConversationState } from "../interfaces/conversation";
import { UserState } from "../interfaces/user";
import { conversationUserReducer } from "./conversation/conversation.reducer";
import { userReducer } from "./user/user.reducer";


export interface AppState{
    user: UserState,
    conversation: ConversationState
}

export const reducers: ActionReducerMap<AppState, any> = {
    user: userReducer,
    conversation: conversationUserReducer
}