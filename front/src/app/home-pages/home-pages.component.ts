import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.scss']
})
export class HomePagesComponent implements OnInit {

  constructor(private router: Router) {
   }

  ngOnInit(): void {
  }

  goToRoom = () => {
    this.router.navigate(['/', uuidv4()]);
  }

}