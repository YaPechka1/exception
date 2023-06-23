import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpGroupComponent } from '../_pop-up/pop-up-group/pop-up-group.component';
import { PopUpPeopleComponent } from '../_pop-up/pop-up-people/pop-up-people.component';
import { PopUpPhotoAvatarComponent } from '../_pop-up/pop-up-photo-avatar/pop-up-photo-avatar.component';
import { PopUpPhotoComponent } from '../_pop-up/pop-up-photo/pop-up-photo.component';
import { PopUpVideoComponent } from '../_pop-up/pop-up-video/pop-up-video.component';
import { EditUserInfo, UserFriend, UserGroup, userPhotoAndVideo, userRecord, user_information } from '../_interfaces/interface';
import { UserInfoService } from '../_services/user-info.service';
import { PopUpPlusZapComponent } from '../_pop-up/pop-up-plus-zap/pop-up-plus-zap.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editmode: boolean = false;
  constructor(private dialogRef: MatDialog, public userInfo: UserInfoService) { }

  form!: FormGroup;

  user_data!: user_information
  user_record!:userRecord[];
  user_photo_and_video!:userPhotoAndVideo;
  user_friend!:UserFriend[];
  user_group!:UserGroup[];

  ngOnInit(): void {

    this.getUserData();
    this.userInfo.UserRecord().subscribe(
      ()=>{
        this.user_record =this.userInfo.getUserRecord();
      }
    );
    this.userInfo.UserPhotoAndVideo().subscribe(
      ()=>{
        this.user_photo_and_video = this.userInfo.getUserPhotoAndVideo();
      }
    )
    this.userInfo.UserFriend().subscribe(
      ()=>{
        this.user_friend = this.userInfo.getUserFriend();
      }
    )
    this.userInfo.UserGroup().subscribe(
      ()=>{
        this.user_group = this.userInfo.getUserGroup();
        console.log(12);
      }
    )
    

    console.log(13);
  }
  openCreateZap() {
    this.dialogRef.open(PopUpPlusZapComponent, { width: '75%' },).afterClosed().subscribe(
      () => {
        this.ngOnInit()
      }
    )
  }
  getUserData(){
    this.userInfo.UserInfo().subscribe(
      ()=>{
        this.user_data = this.userInfo.getUserInfo();

        this.form = new FormGroup({
          nick_name: new FormControl(null,[Validators.required, Validators.minLength(2)]),
          about: new FormControl(null),
          tel:new FormControl(null,[Validators.pattern('[- +()0-9]{10,12}')]),
          mail:new FormControl(null,[Validators.email])
        })

        this.form.setValue({
          nick_name:this.user_data.nick_name,
          about:this.user_data.about_me,
          tel:this.user_data.phone,
          mail:this.user_data.mail
        })
      }
    )
  }
  openDialogPhoto(){
this.dialogRef.open(PopUpPhotoComponent,{
  data: this.user_photo_and_video.img_src

})
}
openDialogPhotoAvatar(){
  this.dialogRef.open(PopUpPhotoAvatarComponent,{
    data:{
      img:this.user_photo_and_video.img_src,
      user_logo_src: this.user_data.user_logo_src
    },
    width:'75%'
  
  })
  }
  
openDialogVideo(){
  this.dialogRef.open(PopUpVideoComponent,{
    data: this.user_photo_and_video.video_src
  
  })

  }
  openDialogFriends(){
    this.dialogRef.open(PopUpPeopleComponent,{
      data: this.user_friend,
      width:'70%'
    })
    }
    openDialogGroup(){
      this.dialogRef.open(PopUpGroupComponent,{
        data: this.user_group,
        width:'70%'
      })
      }
  Save(){
    console.log(12);
    if (!this.form.invalid) {

      let edit_user_info:EditUserInfo={
        about:this.form.get('about')?.value,
        phone:this.form.get('tel')?.value,
        mail:this.form.get('mail')?.value,
        nick_name:this.form.get('nick_name')?.value
      }
      console.log(edit_user_info)
      this.userInfo.editUserInfo(edit_user_info).subscribe();
      this.editmode = !this.editmode;
    }
  }

}

