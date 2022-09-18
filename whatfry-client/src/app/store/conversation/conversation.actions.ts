import { Action } from "@ngrx/store"
import { Conversation } from "src/app/interfaces/conversation"

export enum ConversationActionTypes{
    GetAllConversations = "[] get all conversation of user",
    GetAllConversationsSuccess = "[] get all conversation of user has been successful",
    GetAllConversationsFailure = "[] get all conversation of user has failed",
 }
 
 export class GetConversationsUser implements Action{
     readonly type = ConversationActionTypes.GetAllConversations
     constructor(readonly payload: any){}
 }
 
 export class GetConversationsUserSuccess implements Action{
     readonly type = ConversationActionTypes.GetAllConversationsSuccess
     constructor(readonly payload: Conversation[]){}
 }
 
 export class GetConversationsUserFailure implements Action{
     readonly type = ConversationActionTypes.GetAllConversationsFailure
     constructor(readonly payload: {error: string}){}
 }
 
 
 
 
 export type ConversationActions = 
 GetConversationsUser |
 GetConversationsUserSuccess|
 GetConversationsUserFailure