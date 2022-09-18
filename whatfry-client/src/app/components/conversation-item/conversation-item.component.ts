import { Component, Input, OnInit } from '@angular/core';
import { Conversation } from 'src/app/interfaces/conversation';
import { Message } from 'src/app/interfaces/message';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss']
})
export class ConversationItemComponent implements OnInit {

  @Input() conversation: Conversation = {
    user: {},
    messages: []
  }
  
  lastMessage: Message = {}
  constructor() { }

  ngOnInit(): void {
    this.lastMessage = this.getLastMessage()
  }

  getLastMessage(){
    const length = this.conversation.messages.length
    return this.conversation.messages[length-1]
  }

}
