import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: Message = {}

  constructor(private elRef:ElementRef) { }

  ngOnInit(): void {
    this.styleMessage()
  }


  styleMessage(){
    let position
    let colorBack
    let colorText
    let colorHeure
    if(this.message.byMe === true){
      position = 'right'
      colorBack = '#005c4b'
      colorText = 'white'
      colorHeure = 'white'
    }else{
      position = 'left'
      colorBack = 'white'
      colorText = 'black'
      colorHeure = 'rgb(100, 100, 100)'
    }
    this.elRef.nativeElement.style.setProperty('--position', position)
    this.elRef.nativeElement.style.setProperty('--colorMessageBack', colorBack)
    this.elRef.nativeElement.style.setProperty('--colorMessageText', colorText)
    this.elRef.nativeElement.style.setProperty('--colorMessageHeure', colorHeure)
  }

}
