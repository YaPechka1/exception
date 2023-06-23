import { Component, OnInit } from '@angular/core';
import { UserFriend, UserList } from '../_interfaces/interface';
import { FriendService } from '../_services/friend.service';
import { UserInfoService } from '../_services/user-info.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  last_index: string = '0';
  last_name: string = '';
  user_name: string = '';

  test: boolean = false;

  search: any;
  search1: any;
  search2: any;
  user_friend!: UserFriend[]
  user_list: UserList[] = [];
  user_my: UserList[] = [];
  user_application:UserList[]=[];



  constructor(private userInfo: UserInfoService, private friend: FriendService) { }


  ngOnInit(): void {
    this.getFriend();
    this.getUsers(this.last_index);
    this.getFriendApplication();
    this.getMyApplication();

  }
  getFriend(){
    this.userInfo.UserFriend().subscribe(
      () => {
        this.user_friend = this.userInfo.getUserFriend();
      }
    )
  }
  getUsers(last_index: string) {
    this.friend.getUsers({ last_index: last_index }).subscribe(
      () => {
        for (let i = 0; i < this.friend.getUserList().length; i++) {
          this.user_list.push(this.friend.getUserList()[i]);
        }
        this.user_list.sort((a, b) => a.id_user > b.id_user ? 1 : -1);
        for (let i = 1; i < this.user_list.length; i++) {
          if (this.user_list[i].id_user == this.user_list[i - 1].id_user) {
            this.user_list.splice(i, 1);
          }
        }
        this.last_index = this.user_list[this.user_list.length - 1].id_user;
        if (last_index != '0') this.test = true;
      }
    )
  }

  editTest(event: any) {
    this.test = event == 3;
    console.log(this.test + " <> " + event)
  }
  getUserOnSearch(reset: boolean) {
    this.last_index = '0'
    if (reset) {
      this.user_list = [];
      this.last_name = '';
    }
    if (this.user_name == '') {
      this.getUsers(this.last_index);
    }
    else {
      this.friend.searchUser({ user_name: this.user_name, last_name: this.last_name }).subscribe(
        () => {

          for (let i = 0; i < this.friend.getUserList().length; i++) {
            this.user_list.push(this.friend.getUserList()[i]);
          }
          this.last_name = this.user_list[this.user_list.length - 1].nick_name;
          this.test=true;
        }
      )
    }
  }

  getFriendApplication(){
    this.friend.FriendApplication().subscribe(
      ()=>{
        this.user_application = this.friend.getFriendApplication();
      }
    )
  }
  getMyApplication(){
    this.friend.MyApplication().subscribe(
      ()=>{
        this.user_my = this.friend.getMyApplication();
      }
    )
  }

  async onScroll() {
    this.test = false;

    if (this.user_name == '') this.getUsers(this.last_index);
    else this.getUserOnSearch(false);

    console.log(this.user_list.length)

  }
  deleteFriend(id_user:string, idx:number){
    this.friend.deleteFriend(id_user).subscribe(
      ()=>{
        this.user_friend.splice(idx,1);
      }
    );
  }
  deleteApplication(id_user:string, idx:number){
    this.friend.deleteApplication(id_user).subscribe(
      ()=>{
        this.user_application.splice(idx, 1)
      }
    );

  }
  deleteMyApplication(id_user:string, idx:number){
    this.friend.deleteMyApplication(id_user).subscribe(
      ()=>{
        this.user_my.splice(idx,1)
        console.log(idx)
      }
    );
  }
  acceptApplication(id_user:string, idx:number){
    this.friend.acceptApplication(id_user).subscribe(
      ()=>{
        this.getFriend();
        this.user_application.splice(idx,1)
      }
    );
  }

}
