import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Identifiant, User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token: string = ''
  url: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }


  login(identifiant: Identifiant){
    const body = {
      "email": identifiant.email,
      "password": identifiant.password
    }
    return this.http.post(this.url+'account/login', body)
  }

  signup(identifiant: Identifiant){
    const body = {
      "firstname": identifiant.firstname,
      "lastname": identifiant.lastname,
      "email": identifiant.email,
      "password": identifiant.password
    }
    return this.http.post(this.url+'account/create', body)
  }


  getAllUsers(){
    this.token = 'Bearer '+localStorage.getItem('token')
    return this.http.get<User[]>(this.url+'account', {
      headers: {
        'Authorization': this.token
      }
    })
  }


  getUser(){ 
    this.token = 'Bearer '+localStorage.getItem('token')
    return this.http.get<User>(this.url+'account/user', {
      headers: {
        'Authorization': this.token
      }
    })
  }


  getErrorMessage(code: string){
    switch(code){
      case '1':
        return 'Wrong email or password'

      default:
        return 'An error has occured'
    }
  }
}
