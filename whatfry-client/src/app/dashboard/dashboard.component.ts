import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, combineLatest, map, Observable, Subject, tap } from 'rxjs';
import { Conversation } from '../interfaces/conversation';
import { ConversationFacade } from '../store/conversation/conversation.facade';
import { UserFacade } from '../store/user/user.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  conversations$: BehaviorSubject<Conversation[]> = new BehaviorSubject<Conversation[]>([])
  conversationsNotif$: Observable<Conversation[]> | undefined

  currentConversation: Conversation = {
    user: {},
    messages: []
  }

  showConv: boolean = false


  constructor(
    conversationFacade: ConversationFacade,
    private socket: Socket,
    private router: ActivatedRoute,
  ) { 
    conversationFacade.getConversationsLoaded$.subscribe(
      convs => {
        this.conversations$.next(convs)
      }
    )
    this.conversationsNotif$ = this.socket.fromEvent<Conversation[]>(this.router.snapshot.data['id'])
  }



  ngOnInit(): void {
    this.conversationsNotif$?.subscribe(convs => {
      this.conversations$.next(convs)
      console.log(convs)
      let newConv = convs.filter(c => c.user.identifier === this.currentConversation.user.identifier)[0]
      this.currentConversation = (typeof newConv !== 'undefined') ? newConv : this.currentConversation
      this.playAudio();
    })
  }

  showConversation(conversation: Conversation){
    this.showConv = true
    this.currentConversation = conversation
  }

  showCurrentConversation($event: Conversation){
    this.showConv = true
    this.currentConversation = $event
  }


  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/sound.mp3";
    audio.load();
    audio.play();
  }


}
