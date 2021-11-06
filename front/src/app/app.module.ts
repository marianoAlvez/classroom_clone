import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePagesComponent } from './home-pages/home-pages.component';
import { RoomPagesComponent } from './room-pages/room-pages.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { MenuBottomComponent } from './components/menu-bottom/menu-bottom.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {withCredentials:'*'} };

@NgModule({
  declarations: [
    AppComponent,
    HomePagesComponent,
    RoomPagesComponent,
    VideoPlayerComponent,
    MenuBottomComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
