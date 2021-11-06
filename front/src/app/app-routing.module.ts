import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './home-pages/home-pages.component';
import { RoomPagesComponent } from './room-pages/room-pages.component';

const routes: Routes = [
  {
    path:'',
    component: HomePagesComponent
  },
  {
    path:':id',
    component: RoomPagesComponent
  } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
