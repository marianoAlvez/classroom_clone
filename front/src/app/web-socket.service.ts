import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  events = ['new-user' , 'bye-user'];  
  cbEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private socket: Socket) { 

    this.Listener();
  }

  Listener = () => {
    this.events.forEach(evenName => {
      this.socket.on(evenName, (data: any) => this.cbEvent.emit({
        name: evenName,
        data        
      }));
    });
  } ;

  joinRoom = (data: any) => {
    this.socket.emit('join', data);
  }
}
