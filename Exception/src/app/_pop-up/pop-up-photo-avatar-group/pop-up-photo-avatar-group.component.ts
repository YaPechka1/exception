import { Component, Inject, OnInit } from '@angular/core';
import { GroupImg } from '../../_interfaces/interface';
import { GroupService } from '../../_services/group.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-photo-avatar-group',
  templateUrl: './pop-up-photo-avatar-group.component.html',
  styleUrls: ['./pop-up-photo-avatar-group.component.css']
})
export class PopUpPhotoAvatarGroupComponent implements OnInit {

  limit: number= Math.round((window.innerHeight*15)/1080);
  last_index_photo: string = '0';
  push_lenght: number = 1;
  group_img: GroupImg[] = [];
  status: boolean = true;
  id: string = '';
  img_src:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private group: GroupService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) { this.getGroupPhoto(params['id'], this.last_index_photo,this.limit+""); this.id = params['id']; }
      this.img_src=this.data;
    })
  }
  editGroupAvatar(edit_group_avatar_from_page:string){
    this.group.editGroupAvatar(this.id, edit_group_avatar_from_page).subscribe();
  }
  getGroupPhoto(id: string, last_index_photo: string, limit:string) {
    this.status=false;
    this.group.GroupImg(id, last_index_photo, limit).subscribe(
      () => {
        this.push_lenght = this.group.getGroupImg().length;
        if (this.push_lenght != 0) {
          for (let i = 0; i < this.group.getGroupImg().length; i++) {
            // console.log(this.group.getGroupNews());
            this.group_img.push(this.group.getGroupImg()[i]);
          }
          this.last_index_photo = this.group_img[this.group_img.length - 1].id_group_record;
          this.status = true;
        }
        //this.tabs=1;
      }
    )
  }

}
