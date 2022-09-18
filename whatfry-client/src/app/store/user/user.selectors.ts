import { createSelector } from "@ngrx/store";
import { AppState } from "..";


export const selectUserState = (state: AppState) => state.user

export const selectError$ = createSelector(
    selectUserState,
    (user) => user.error
)

export const selectUserId$ = createSelector(
    selectUserState,
    (user) => user.userData?.identifier!
)

export const selectAllUsers$ = createSelector(
    selectUserState,
    (user) => user.users
)