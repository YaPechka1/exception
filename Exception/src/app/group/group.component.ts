import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { GroupList, GroupListAdmin } from '../_interfaces/interface';
import { GroupService } from '../_services/group.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpGroupCreateComponent } from '../_pop-up/pop-up-group-create/pop-up-group-create.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  x: ThemePalette ='primary';
  group_list!:GroupList[];
  group_list_all:GroupList[]=[];
  group_list_admin!:GroupListAdmin[];

  last_index:string='0';
  last_group_name='';
  group_name:string='';

  searchMy:any;
  searchAdmin:any;

  tabs:number=0;

  constructor(private group:GroupService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.group.UserGroupList().subscribe(
      () => {
        this.group_list = this.group.getUserGroupList();
      }
    )
    this.group.UserGroupListAdmin().subscribe(
      ()=>{
        this.group_list_admin=this.group.getUserGroupListAdmin();
      }
    )
    this.getGroups(this.last_index);
  }
  test(event:any){
    this.tabs=event;
  }
  onScroll(){
    this.tabs=12;
      if (this.group_name == '') this.getGroups(this.last_index);
      else this.getGroupOnSearch(false);
    console.log(this.group_list_all.length)
    
  }
  getGroups(last_index: string) {
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
        this.last_index = this.group_list_all[this.group_list_all.length - 1].id_group;
        this.tabs=1;
      }
    )
  }
  getGroupOnSearch(reset: boolean) {
    this.last_index = '0'
    if (reset) {
      this.group_list_all = [];
      this.last_group_name = '';
    }
    if (this.group_name == '') {
      this.getGroups(this.last_index);
    }
    else {
      this.group.searchGroup({ group_name: this.group_name, last_group_name: this.last_group_name }).subscribe(
        () => {

          for (let i = 0; i < this.group.getGroupList().length; i++) {
            this.group_list_all.push(this.group.getGroupList()[i]);
          }
          this.last_group_name = this.group_list_all[this.group_list_all.length - 1].group_name;
          this.tabs=1;
        }
      )
    }
  }
  createGroup(){
    this.dialogRef.open(PopUpGroupCreateComponent, { width: '75%' },).afterClosed().subscribe(
      () => {
        this.group.UserGroupListAdmin().subscribe(
          ()=>{
            this.group_list_admin=this.group.getUserGroupListAdmin();
          }
        )
      }
    )
  }

}
