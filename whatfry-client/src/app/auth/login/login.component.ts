import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppState } from 'src/app/store';
import { LogInUser } from 'src/app/store/user/user.actions';
import { UserFacade } from 'src/app/store/user/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
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

  login(){
    this.showLoading$.next(true)
    this.store.dispatch(new LogInUser({email: this.form.value.email, password: this.form.value.password}))
  }

  goToSignUp(){
    this.router.navigateByUrl('/auth/signup', {replaceUrl: true})
  }

}
