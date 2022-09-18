import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/interfaces/conversation';
import { User } from 'src/app/interfaces/user';
import { UserFacade } from 'src/app/store/user/user.facade';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit {

  @Input() conversations: Conversation[] = []
  @Output() showCurrentConversation: EventEmitter<Conversation> = new EventEmitter<Conversation>()

  allUsers$: Observable<any> | undefined

  constructor(
    private userFacade: UserFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allUsers$ = this.userFacade.getAllUsers$
  }

  showConv(conversation: Conversation){
    this.showCurrentConversation.emit(conversation)
  }

  showNewDiscussion(){
    let element = document.getElementsByClassName('accounts')[0] as any
    element.style.left = '0'
    element.style.right = '0'
    element.style.transition = 'all .5s'
    element.style.zIndex = '2'
  }

  closeNewDiscussion(){
    let element = document.getElementsByClassName('accounts')[0] as any
    element.style.left = '-100%'
    element.style.right = '100%'
    element.style.transition = 'all .5s'
  }

  showNewConversation(user: User){
    let conversation = this.conversations.find(conv => conv.user.identifier === user.identifier)
    if(conversation){
      this.showCurrentConversation.emit(conversation)
    }else{
      const newConv = {
        user: user,
        messages: []
      }
      this.showCurrentConversation.emit(newConv)
    }

  }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("identifier")
    this.router.navigateByUrl('/auth/login', {
			replaceUrl: true
		})
  }

}
