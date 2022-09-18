import { Action } from "@ngrx/store";
import { Identifiant, User } from "src/app/interfaces/user";


export enum UserActionTypes{
    LogIn = "[User] log in a user",
    LogInSucess = "[User] log in a user has been succesful",
    LogInFailure = "[User] log in a user has been failed",

    SignUp = "[User] sign up a user",
    SignUpSucess = "[User] sign up a user has been succesful",
    SignUpFailure = "[User] sign up a user has been failed",

    GetAllUsers = "[User] get all users",
    GetAllUsersSuccess = "[User] get all users has been succesful",
    GetAllUsersFailure = "[User] get all users has been failed"
    
}

export class LogInUser implements Action{
    readonly type = UserActionTypes.LogIn
    constructor(readonly payload: Identifiant){}
}


export class LogInUserSuccess implements Action{
    readonly type = UserActionTypes.LogInSucess;
    constructor(public payload: { token: string }){}
} 

export class LogInUserFailure implements Action{
    readonly type = UserActionTypes.LogInFailure;
    constructor(readonly payload: { error: string }){}
} 

export class SignUpUser implements Action{
    readonly type = UserActionTypes.SignUp
    constructor(readonly payload: Identifiant){}
}


export class SignUpUserSuccess implements Action{
    readonly type = UserActionTypes.SignUpSucess;
    constructor(public payload: { token: string }){}
} 

export class SignUpUserFailure implements Action{
    readonly type = UserActionTypes.SignUpFailure;
    constructor(readonly payload: { error: string }){}
} 


export class GetAllUsers implements Action{
    readonly type = UserActionTypes.GetAllUsers
    constructor(){}
}


export class GetAllUsersSuccess implements Action{
    readonly type = UserActionTypes.GetAllUsersSuccess;
    constructor(public payload: User[]){}
} 

export class GetAllUsersFailure implements Action{
    readonly type = UserActionTypes.GetAllUsersFailure;
    constructor(readonly payload: { error: string }){}
} 

export type UserActions =  
    LogInUser | 
    LogInUserFailure | 
    LogInUserSuccess | 
    GetAllUsers | 
    GetAllUsersSuccess | 
    GetAllUsersFailure | 
    SignUpUser | 
    SignUpUserSuccess | 
    SignUpUserFailure