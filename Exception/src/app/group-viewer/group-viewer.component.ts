import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopUpGroupComponent } from '../_pop-up/pop-up-group/pop-up-group.component';
import { PopUpPeopleGroupComponent } from '../_pop-up/pop-up-people-group/pop-up-people-group.component';
import { PopUpPeopleComponent } from '../_pop-up/pop-up-people/pop-up-people.component';
import { PopUpPhotoAvatarComponent } from '../_pop-up/pop-up-photo-avatar/pop-up-photo-avatar.component';
import { PopUpPhotoGroupComponent } from '../_pop-up/pop-up-photo-group/pop-up-photo-group.component';
import { PopUpVideoGroupComponent } from '../_pop-up/pop-up-video-group/pop-up-video-group.component';
import { GroupInfo, GroupRecord } from '../_interfaces/interface';
import { GroupService } from '../_services/group.service';

@Component({
  selector: 'app-group-viewer',
  templateUrl: './group-viewer.component.html',
  styleUrls: ['./group-viewer.component.css']
})
export class GroupViewerComponent implements OnInit {

  group_info!: GroupInfo;
  last_index: string = '0';
  last_index_photo: string = '0';
  push_lenght: number = 1;
  push_lenght_photo: number = 1;
  group_record: GroupRecord[] = [];
  status: boolean = true;
  group_status:number=0;
  id: string = '0';

  constructor(private dialogRef: MatDialog, private group: GroupService, private route: ActivatedRoute, private router: Router) { }

  openDialogPhoto() {
    this.dialogRef.open(PopUpPhotoGroupComponent, {
      width:'70%',
      

    })
  }


  openDialogVideo() {
    this.dialogRef.open(PopUpVideoGroupComponent, {
      width:'70%'

    })
  }
  openDialogPeople() {
    this.dialogRef.open(PopUpPeopleGroupComponent, {

      width: '70%'
    })
  }


  ngOnInit(): void {


    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.group.GroupInfo(params['id']).subscribe(
          () => {
            this.group_info = this.group.getGroupInfo();
            console.log(this.group_info)
            if (!this.group_info) this.router.navigate(['/**'])
          });
        
        this.getGroupRecord();
        this.getGroupStatus(params["id"])
      }
    }

    )


  }

  getGroupStatus(id_group:string){
    console.log(id_group)
    this.group.GroupSatus(id_group).subscribe(
      ()=>{
        this.group_status=this.group.getGroupStatus()
      }
    )
  }

  getGroupRecord() {
    this.group.GroupNews(this.id, this.last_index).subscribe(
      () => {
        this.push_lenght = this.group.getGroupNews().length;
        for (let i = 0; i < this.group.getGroupNews().length; i++) {
          console.log(this.group.getGroupNews());
          this.group_record.push(this.group.getGroupNews()[i]);
        }
        this.last_index = this.group_record[this.group_record.length - 1].id_group_record;
        this.status = true;
        //this.tabs=1;
      }
    )
  }
  pushPeople(){
    this.group.pushPeople(this.id).subscribe(
      ()=>{
        this.getGroupStatus(this.id);
      }
    )
  }
  deletePeople(){
    this.group.deletePeople(this.id).subscribe(
      ()=>{
        this.getGroupStatus(this.id);
      }
    )
  }
  onScroll() {
    this.status = false;
    this.getGroupRecord();
  }
  

}
