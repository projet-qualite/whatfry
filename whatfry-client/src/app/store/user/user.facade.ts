import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { UserService } from "src/app/services/user.service";
import { AppState } from "..";
import { selectAllUsers$, selectError$, selectUserId$ } from "./user.selectors";


@Injectable({
    providedIn: 'root'
})
export class UserFacade{
    constructor(
        private store: Store<AppState>,
        private userService: UserService
    ){}

    getUserError$ = this.store.select(selectError$)
    getUserId$ = this.store.select(selectUserId$)
    getAllUsers$ = this.store.select(selectAllUsers$)

    getUser(){
        return this.userService.getUser()
    }
}