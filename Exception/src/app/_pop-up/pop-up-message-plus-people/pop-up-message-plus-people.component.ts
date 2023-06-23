import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../_services/user-info.service';
import { UserFriend } from '../../_interfaces/interface';
import { MessageService } from '../../_services/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-message-plus-people',
  templateUrl: './pop-up-message-plus-people.component.html',
  styleUrls: ['./pop-up-message-plus-people.component.css']
})
export class PopUpMessagePlusPeopleComponent implements OnInit {

  id_message_list:string='';
  user_friend!: UserFriend[];
  btnList:string[] = [];

  constructor(private message:MessageService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id'] && params['message_name']) {
        this.id_message_list = params['id'];
        this.message.FriendNotFoundMessage(this.id_message_list).subscribe(
          ()=>{
            this.user_friend=this.message.getFriendNotFoundMessage();
          }
        )
      }
    })
  }
  pushPeopleMessage(id_user:string, id_btn:string){
    this.message.pushPeopleMessage(this.id_message_list, id_user).subscribe(
      ()=>{
        document.getElementById(id_btn)?.classList.add('dis');
        this.btnList.push(id_btn);
      }
    )
  }
  getDisabled(id_btn:string):boolean{
    for (let i=0;i<this.btnList.length;i++){
      if (this.btnList[i]==id_btn) return true;
    }
    return false;
  }



}
