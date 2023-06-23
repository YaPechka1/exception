import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupImg } from '../../_interfaces/interface';
import { GroupService } from '../../_services/group.service';

@Component({
  selector: 'app-pop-up-photo-group',
  templateUrl: './pop-up-photo-group.component.html',
  styleUrls: ['./pop-up-photo-group.component.css']
})
export class PopUpPhotoGroupComponent implements OnInit {


  constructor(private group: GroupService, private route: ActivatedRoute) { }

  limit: number= Math.round((window.innerHeight*15)/1080);
  last_index_photo: string = '0';
  push_lenght: number = 1;
  group_img: GroupImg[] = [];
  status: boolean = true;
  id: string = '';
  ngOnInit(): void {
    console.log(this.limit)
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) { this.getGroupPhoto(params['id'], this.last_index_photo,this.limit+""); this.id = params['id']; }
    })
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
  onScrollTemp() {
    console.log(this.group_img.length);
    if (this.status) this.getGroupPhoto(this.id, this.last_index_photo,this.limit+"");
  }

  img_src: string = '';
  show: boolean = false;

}
