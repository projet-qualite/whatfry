import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  token: string = 'Bearer '+localStorage.getItem('token')

  url: string = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }


  sendMessage(message: string, destinataire: string){
    const body = {
      "text": message,
      "identifier": destinataire
    }
    return this.http.post(this.url+'message/sendmessage', 
      body,
      {
        headers: {
          'Authorization': this.token
        }
      }
    )
  }
}
