import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupVideo } from '../../_interfaces/interface';
import { GroupService } from '../../_services/group.service';

@Component({
  selector: 'app-pop-up-video-group',
  templateUrl: './pop-up-video-group.component.html',
  styleUrls: ['./pop-up-video-group.component.css']
})
export class PopUpVideoGroupComponent implements OnInit {

  constructor(private group: GroupService, private route: ActivatedRoute) { }
  limit: number= Math.round((window.innerHeight*15)/1080);
  last_index_video: string = '0';
  push_lenght: number = 1;
  group_video: GroupVideo[] = [];
  status: boolean = true;
  id: string = '';

  ngOnInit(): void {
    console.log(this.limit)
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) { this.getGroupVideo(params['id'], this.last_index_video,this.limit+""); this.id = params['id']; }
    })
  }
  getGroupVideo(id: string, last_index_video: string,limit:string) {
    this.status=false;
    this.group.GroupVideo(id, last_index_video,limit).subscribe(
      () => {
        this.push_lenght = this.group.getGroupVideo().length;
        if (this.push_lenght != 0) {
          for (let i = 0; i < this.group.getGroupVideo().length; i++) {
            // console.log(this.group.getGroupNews());
            this.group_video.push(this.group.getGroupVideo()[i]);
          }
          this.last_index_video = this.group_video[this.group_video.length - 1].id_group_record;
          this.status = true;
        }
        //this.tabs=1;
      }
    )
  }
  onScrollTemp() {
    console.log(this.group_video.length);
    if (this.status) this.getGroupVideo(this.id, this.last_index_video,this.limit+"");
  }

  video_src: string = '';
  show: boolean = false;
}
