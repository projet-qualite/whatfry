import { createSelector } from "@ngrx/store";
import { AppState } from "..";


export const selectConversationState = (state: AppState) => state.conversation

export const selectConversationsLoaded$ = createSelector(
    selectConversationState,
    (conversation) => conversation.conversationData
)