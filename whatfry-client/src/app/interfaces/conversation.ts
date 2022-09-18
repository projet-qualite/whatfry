import { Message } from "./message";
import { User } from "./user";

export interface Conversation {
    user: User,
    messages: Message[]
}


export interface ConversationState{
    conversationData: Conversation[]
}