import { UserState } from "src/app/interfaces/user";
import { UserActions, UserActionTypes } from "./user.actions";


export const initialUserState: UserState = {
    userData: {},
    token: '',
    error: '',
    users: []
}


export function userReducer(state: UserState = initialUserState, action: UserActions): UserState{
    switch(action.type){
        case UserActionTypes.LogInSucess:
            const token = action.payload.token
            return {...state, token}

        case UserActionTypes.LogInFailure:
            let error = action.payload.error
            return {...state, error}
        
        case UserActionTypes.SignUpFailure:
            let error2 = action.payload.error
            return {...state, error: error2}

        case UserActionTypes.GetAllUsersSuccess:
            let users = {users: action.payload}
            return {...state, ...users}
        default:
            return state
    }
}