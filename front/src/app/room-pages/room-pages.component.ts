import { PeerService } from './../peer.service';
import { WebSocketService } from './../web-socket.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { generate } from 'rxjs';
import { __generator } from 'tslib';

@Component({
  selector: 'app-room-pages',
  templateUrl: './room-pages.component.html',
  styleUrls: ['./room-pages.component.scss']
})
export class RoomPagesComponent implements OnInit {
  roomName: string|null;
  currentStream:any;
  listUser: Array<any> = [];

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService, private peerService: PeerService) {
    this.roomName = route.snapshot.paramMap.get('id');
    console.log('--->', this.roomName);
   }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();    
  }

  initPeer = () => {
    const {peer} = this.peerService;    //const peer = this.peerService.peer; cuando la constante que declaramos se llama igual que la que queremos invocar
    peer.on('open', (id:string) => {
      const body = {
        idPeer:id,
        roomName: this.roomName
      };

      this.webSocketService.joinRoom(body);

      //console.log('ID PEER:', id)
    });


    peer.on('call', (callEnter: { answer: (arg0: any) => void; on: (arg0: string, arg1: (streamRemote: any) => void) => void; }) => {
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote: any) => {
        this.addVideoUser(streamRemote)
      });
      }, (err: any) => {
        console.log('*** ERROR *** Peer call', err);      
    });
  }

  initSocket = () =>{
    this.webSocketService.cbEvent.subscribe( res => {
      //console.log('SOCKET', res)
      if (res.name === 'new-user') {
        const {idPeer} = res.data
        //console.log('ID PEER', idPeer)
        this.sendCall(idPeer, this.currentStream);
      }
    })
  }

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,

        video: true

      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);
      
      }).catch(() => {
        console.log('*** ERROR *** Not permissions');
      });
    }else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser =(stream: any) => {
    this.listUser.push(stream);
    const unique = new Set(this.listUser)
    this.listUser = [...unique];
  }

  sendCall = (idPeer: any, stream: any) => {
    const newUserCall = this.peerService.peer.call(idPeer, stream);
    if(!!newUserCall) {
      newUserCall.on( 'stream', (userStream: MediaStream) => {
        this.addVideoUser(userStream);
      })
    }
  }

}
