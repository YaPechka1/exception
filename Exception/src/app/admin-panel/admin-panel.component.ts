import { Component, OnInit } from '@angular/core';
import { GroupList, UserList } from '../_interfaces/interface';
import { GroupService } from '../_services/group.service';
import { FriendService } from '../_services/friend.service';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-adpmin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdpminPanelComponent implements OnInit {

  last_index_user: string = '0';
  user_list: UserList[] = [];
  last_name: string = '';
  user_name: string = '';

  group_name: string = '';
  group_list_all: GroupList[] = [];
  tabs: number = 0;
  last_index_group: string = '0';
  last_group_name = '';



  constructor(private group: GroupService, private friend: FriendService, private admin: AdminService) { }

  ngOnInit(): void {
    this.getGroups(this.last_index_group);
    this.getUsers(this.last_index_user);
  }

  onScroll() {
    console.log('sdjid')
    switch (this.tabs) {
      case 0: if (this.last_name != '') this.getUserOnSearch(false); else this.getUsers(this.last_index_user); break;
      case 1: if (this.last_group_name != '') this.getGroupOnSearch(false); else this.getGroups(this.last_index_group); break;
    }
  }
  getGroupOnSearch(reset: boolean) {
    this.last_index_group = '0'
    if (reset) {
      this.group_list_all = [];
      this.last_group_name = '';
    }
    if (this.group_name == '') {
      this.getGroups(this.last_index_group);
    }
    else {
      this.group.searchGroup({ group_name: this.group_name, last_group_name: this.last_group_name }).subscribe(
        () => {

          for (let i = 0; i < this.group.getGroupList().length; i++) {
            this.group_list_all.push(this.group.getGroupList()[i]);
          }
          this.last_group_name = this.group_list_all[this.group_list_all.length - 1].group_name;
          // this.tabs=1;
        }
      )
    }
  }
  getGroups(last_index: string) {

    if (last_index == '0') {
      this.group_list_all = []
    }
    this.group.getGroups({ last_index: last_index }).subscribe(
      () => {
        for (let i = 0; i < this.group.getGroupList().length; i++) {
          this.group_list_all.push(this.group.getGroupList()[i]);
        }
        this.group_list_all.sort((a, b) => a.id_group > b.id_group ? 1 : -1);
        for (let i = 1; i < this.group_list_all.length; i++) {
          if (this.group_list_all[i].id_group == this.group_list_all[i - 1].id_group) {
            this.group_list_all.splice(i, 1);
          }
        }
        
        this.last_index_group = this.group_list_all[this.group_list_all.length - 1].id_group;
        // this.tabs=1;
      }
    )
  }

  getUsers(last_index: string) {

    if (last_index == '0') {
      this.user_list = []
    }
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
        this.last_index_user = this.user_list[this.user_list.length - 1].id_user;

      }
    )
  }
  getUserOnSearch(reset: boolean) {
    this.last_index_user = '0'
    if (reset) {
      this.user_list = [];
      this.last_name = '';
    }
    if (this.user_name == '') {
      this.getUsers(this.last_index_user);
    }
    else {
      this.friend.searchUser({ user_name: this.user_name, last_name: this.last_name }).subscribe(
        () => {

          for (let i = 0; i < this.friend.getUserList().length; i++) {
            this.user_list.push(this.friend.getUserList()[i]);


          }
          this.last_name = this.user_list[this.user_list.length - 1].nick_name;
        }
      )
    }
  }

  deleteUser(id_user: string, index: number) {
    this.user_list.splice(index, 1)
    this.admin.deleteUser(id_user).subscribe(
      () => {
      }
    )
  }
  deleteGroup(id_group: string, index: number) {
    this.group_list_all.splice(index, 1)
    this.admin.deleteGroup(id_group).subscribe(
      () => {
      }
    )
  }
}
