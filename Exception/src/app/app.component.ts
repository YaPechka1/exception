import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  enter:boolean = this.auth.isEnter();

  ngOnInit(): void {
    this.editWindow(event);
    window.addEventListener('scroll', () => { this.edit() }, true)
    // this.loginOnToken();
  }

  getEnter():boolean{
    return this.auth.isEnter();
  }
  getAdmin():boolean{
    return this.auth.getAdmin();
  }

  constructor (private auth: AuthService, public router:Router, private socket:Socket){
    this.socket.ioSocket.io.opts.query = { Authorization: `${localStorage.getItem('token')}` };
  }
  mode:MatDrawerMode='side';
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  title = 'Exception';
  scrollValueQ:number=0;

  editWindow(event: any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth<=850) this.mode='over'; else this.mode='side';
  }
  edit() {
    console.log(1284)
    this.scrollValueQ = document.documentElement.scrollTop;

  }


}
