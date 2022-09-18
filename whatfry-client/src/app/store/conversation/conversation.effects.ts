import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Conversation } from "src/app/interfaces/conversation";
import { ConversationService } from "src/app/services/conversation.service";
import { ConversationActionTypes, GetConversationsUserFailure, GetConversationsUserSuccess } from "./conversation.actions";


@Injectable()
export class ConversationEffects{

    constructor(
        private actions$: Actions,
        private convService: ConversationService
    ){}

    @Effect()
    getAllConversation$ = this.actions$.pipe(
        ofType(ConversationActionTypes.GetAllConversations),
        switchMap((action: any) => {
            return this.convService.getConversations().pipe(
                map((conversations: Conversation[]) => {
                    return new GetConversationsUserSuccess(conversations)
                }),
                catchError((errorMessage) => {
                    return of(new GetConversationsUserFailure({error: errorMessage}))
                })
            )
        })
    )

}