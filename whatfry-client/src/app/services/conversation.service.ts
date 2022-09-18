import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversation } from '../interfaces/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  token: string = ''

  url: string = 'http://localhost:3000/'
  constructor(private http: HttpClient) { 
  }


  getConversations(){
    this.token = 'Bearer '+localStorage.getItem('token')
    return this.http.get<Conversation[]>(this.url+'message', {
      headers: {
        'Authorization': this.token
      }
    })
  }

}
