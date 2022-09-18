import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Conversation } from "src/app/interfaces/conversation";
import { AppState } from "..";
import { GetAllUsers } from "../user/user.actions";
import { GetConversationsUser, GetConversationsUserSuccess } from "./conversation.actions";
import { selectConversationsLoaded$ } from "./conversation.selectors";


@Injectable({
    providedIn: 'root'
})
export class ConversationFacade{

    constructor(private store: Store<AppState>){}

    getConversationsLoaded$ = this.store.select(selectConversationsLoaded$)

 
    loadAllConversations(){
        this.store.dispatch(new GetConversationsUser(null))
    }

    getConversationSuccess(conversations: Conversation[]){
        this.store.dispatch(new GetConversationsUserSuccess(conversations))
    }

    getAllUsers(){
        this.store.dispatch(new GetAllUsers())
    }
}