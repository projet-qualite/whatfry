import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Conversation } from 'src/app/interfaces/conversation';
import { MessageService } from 'src/app/services/message.service';
import { AppState } from 'src/app/store';
import { GetConversationsUser } from 'src/app/store/conversation/conversation.actions';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterViewChecked {

  @Input() conversation: Conversation = {
    user: {},
    messages: []
  }


  form = new FormGroup({
    message: new FormControl('')
  })

  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;

  constructor(
    private messageService: MessageService, 
    private store: Store<AppState>
  ) { }



  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
      } catch(err) { }                 
  }


  sendMessage(){
    let goodMessage = (this.form.value.message.trim() !== '') ? true : false
    let hour = new Date().getHours()+':'+ new Date().getMinutes()
    if(goodMessage){
      this.messageService.sendMessage(this.form.value.message, this.conversation.user.identifier?.toString()!).subscribe(
        () => {
          this.store.dispatch(new GetConversationsUser(null))
          this.form.reset();
        }
      )
    }
  }

}
