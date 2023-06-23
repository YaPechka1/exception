import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopUpGroupComponent } from '../_pop-up/pop-up-group/pop-up-group.component';
import { PopUpPeopleComponent } from '../_pop-up/pop-up-people/pop-up-people.component';
import { PopUpPhotoComponent } from '../_pop-up/pop-up-photo/pop-up-photo.component';
import { PopUpVideoComponent } from '../_pop-up/pop-up-video/pop-up-video.component';
import { UserFriend, UserGroup, userPhotoAndVideo, userRecord, user_information } from '../_interfaces/interface';
import { UserInfoService } from '../_services/user-info.service';
import { FriendService } from '../_services/friend.service';


@Component({
  selector: 'app-profile-viewer',
  templateUrl: './profile-viewer.component.html',
  styleUrls: ['./profile-viewer.component.css']
})
export class ProfileViewerComponent implements OnInit {

  constructor(private dialogRef: MatDialog, private userInfo: UserInfoService, private route: ActivatedRoute, private router: Router, private friend:FriendService) { }
  id_user:string='';
  user_data!: user_information
  user_record_people!: userRecord[]
  user_photo_and_video_people!: userPhotoAndVideo;
  user_friend_people!: UserFriend[];
  user_group_people!: UserGroup[];
  user_status:number =2;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) {
        this.id_user=params['id'];
        if (params['id']==localStorage.getItem('id_user')){
          this.router.navigate(['/profile'])
        }
        this.userInfo.UserInfoPeople(params['id']).subscribe(
          () => {
            this.user_data = this.userInfo.getUserInfoPeople();
            if (!this.user_data) this.router.navigate(['/**'])
          })
        this.userInfo.UserRecordPeople(params['id']).subscribe(
          () => {
            this.user_record_people = this.userInfo.getUserRecordPeople();
          }
        );
        this.userInfo.UserPhotoAndVideoPeople(params['id']).subscribe(
          () => {
            this.user_photo_and_video_people = this.userInfo.getUserPhotoAndVideoPeople();
          }
        )
        this.userInfo.UserFriendPeople(params['id']).subscribe(
          () => {
            this.user_friend_people = this.userInfo.getUserFriendPeople();
          }
        )
        this.userInfo.UserGroupPeople(params['id']).subscribe(
          () => {
            this.user_group_people = this.userInfo.getUserGroupPeople();
            console.log(12);
          }
        )
        this.userInfo.UserFriendStatus(params['id']).subscribe(
          ()=>{
            this.user_status=this.userInfo.getUserFriendStatus()
          }
        )
      }
      else this.router.navigate(['/**'])
    })


  }
  openDialogPhoto() {
    this.dialogRef.open(PopUpPhotoComponent, {
      data: this.user_photo_and_video_people.img_src

    })
  }

  openDialogVideo() {
    this.dialogRef.open(PopUpVideoComponent, {
      data: this.user_photo_and_video_people.video_src

    })
  }
  openDialogFriends() {
    this.dialogRef.open(PopUpPeopleComponent, {
      data: this.user_friend_people,
      width: '70%'
    })
  }
  openDialogGroup() {
    this.dialogRef.open(PopUpGroupComponent, {
      data: this.user_group_people,
      width: '70%'
    })
  }
  pushFriend(id_user:string){
    this.friend.pushFriend(id_user).subscribe(
      ()=>{
        this.userInfo.UserFriendStatus(id_user).subscribe(
          ()=>{
            this.user_status=this.userInfo.getUserFriendStatus()
          }
        )
      }
    )
  }
}
