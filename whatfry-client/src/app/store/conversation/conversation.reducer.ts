import { ConversationState } from "src/app/interfaces/conversation";
import { ConversationActions, ConversationActionTypes } from "./conversation.actions";

 

 export const initialConversationState: ConversationState = {
    conversationData: []
}

export function conversationUserReducer(state: ConversationState = initialConversationState, action: ConversationActions){
    switch(action.type){
        case ConversationActionTypes.GetAllConversationsSuccess:
            let s = {conversationData: action.payload}
            return {...state, ...s}

        default:
            return state
    }
}