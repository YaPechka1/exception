import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoService } from '../../_services/user-info.service';

@Component({
  selector: 'app-pop-up-photo-avatar',
  templateUrl: './pop-up-photo-avatar.component.html',
  styleUrls: ['./pop-up-photo-avatar.component.css']
})
export class PopUpPhotoAvatarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public userInfo: UserInfoService) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  editUserAvatar(edit_user_avatar_from_page:string){
    this.userInfo.editUserAvatar({edit_user_avatar:edit_user_avatar_from_page}).subscribe();
    this.userInfo.user_info.user_logo_src=edit_user_avatar_from_page;
  }
}
