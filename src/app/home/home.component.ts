import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { myAnimation } from '../animations';
import { WebsocketService } from '../websocket.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [myAnimation],
  providers: [WebsocketService, ChatService]

})
export class HomeComponent extends BaseComponent implements OnInit {
 

  name:string = ""
  htmlToAdd: string = ""
  i = 0
  constructor(private chatService: ChatService) { 
    super();

    chatService.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg)
    })
  }

  ngOnInit() {
    this.toggle();
  }

  public message = { 
    author: 'Frank Novello',
    message: 'This is a test message'
  }

  sendMsg() {
    this.i = this.i + 1;

    console.log("new message from client to websocket: ", this.message);
    this.chatService.messages.next(this.message);
 

    this.htmlToAdd = `<div class="message"> <h1>${this.message.message}</h1></div>`
    
    this.message.message = "";
  }

}
