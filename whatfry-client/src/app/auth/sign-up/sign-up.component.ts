import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppState } from 'src/app/store';
import { LogInUser, SignUpUser } from 'src/app/store/user/user.actions';
import { UserFacade } from 'src/app/store/user/user.facade';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })

  error$: Observable<any> | undefined
  showLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(
    private store: Store<AppState>, 
    private userFacade: UserFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.error$ = this.userFacade.getUserError$
  }

  signup(){
    this.showLoading$.next(true)
    this.store.dispatch(new SignUpUser(
      {
        lastname: this.form.value.lastname,
        firstname: this.form.value.firstname,
        email: this.form.value.email, 
        password: this.form.value.password
      }
    ))
  }


  goToLogIn(){
    this.router.navigateByUrl('/auth/login', {replaceUrl: true})
  }

}
