import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { User } from "src/app/interfaces/user";
import { UserService } from "src/app/services/user.service";
import { UserActionTypes, LogInUserSuccess, LogInUserFailure, GetAllUsersSuccess, GetAllUsersFailure, SignUpUserSuccess, SignUpUserFailure, LogInUser } from "./user.actions";


@Injectable()
export class UserEffects{


    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router
    ){}

    @Effect()
    loginUser$ = this.actions$.pipe(
        ofType(UserActionTypes.LogIn),
        switchMap((action: any) => this.userService.login(action.payload).pipe(
            map((token: any) => {
                return new LogInUserSuccess(token)
            }),
            catchError((errorMessage) => {
                const error = this.userService.getErrorMessage(errorMessage.error.code)
                return of(new LogInUserFailure({error}))
            })
        ))
    )

    @Effect()
    signupUser$ = this.actions$.pipe(
        ofType(UserActionTypes.SignUp),
        switchMap((action: any) => this.userService.signup(action.payload).pipe(
            map((token: any) => {
                return new LogInUser({email: action.payload.email, password: action.payload.password})
            }),
            catchError((errorMessage) => {
                const error = this.userService.getErrorMessage(errorMessage.error.code)
                return of(new SignUpUserFailure({error}))
            })
        ))
    )


    @Effect({ dispatch: false })
    loginUserSuccess$ = this.actions$.pipe(
        ofType(UserActionTypes.LogInSucess),
        tap((action: any) => {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('identifier', action.payload.identifier)
            this.router.navigateByUrl('/dashboard', {
                replaceUrl: true
            })
        })
    )

    @Effect({ dispatch: false })
    signupUserSuccess$ = this.actions$.pipe(
        ofType(UserActionTypes.SignUpSucess),
        tap((action: any) => {
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('identifier', action.payload.identifier)
            this.router.navigateByUrl('/dashboard', {
                replaceUrl: true
            })
        })
    )


    @Effect()
    getAllUsers$ = this.actions$.pipe(
        ofType(UserActionTypes.GetAllUsers),
        switchMap((action: any) => this.userService.getAllUsers().pipe(
            map((users: User[]) => {
                return new GetAllUsersSuccess(users)
            }),
            catchError((errorMessage) => {
                const error = this.userService.getErrorMessage(errorMessage.error.code)
                return of(new GetAllUsersFailure({error}))
            })
        ))
    )
    
}