import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { map, Observable, of, switchMap } from "rxjs";
import { Conversation } from "../interfaces/conversation";
import { User } from "../interfaces/user";
import { ConversationService } from "../services/conversation.service";
import { ConversationFacade } from "../store/conversation/conversation.facade";
import { UserFacade } from "../store/user/user.facade";


@Injectable({
    providedIn: 'root'
})
export class ConversationsResolver implements Resolve<any>{
    constructor(
        private convService: ConversationService,
        private conversationFacade: ConversationFacade,
        private userFacade: UserFacade,
    ){}

    resolve(): Observable<any> {
        return this.convService.getConversations().pipe(
            switchMap((conversations: Conversation[]) => {
                this.conversationFacade.getConversationSuccess(conversations)
                this.conversationFacade.getAllUsers()
                return this.userFacade.getUser().pipe(
                    switchMap((user: User) => {
                        return of(user.identifier)
                    })
                )
            })
        )
    }


}