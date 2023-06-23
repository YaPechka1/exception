import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { GroupService } from '../_services/group.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateRecordGroup, GroupInfo, GroupRecord } from '../_interfaces/interface';
import { PopUpPhotoGroupComponent } from '../_pop-up/pop-up-photo-group/pop-up-photo-group.component';
import { PopUpVideoGroupComponent } from '../_pop-up/pop-up-video-group/pop-up-video-group.component';
import { PopUpPeopleGroupComponent } from '../_pop-up/pop-up-people-group/pop-up-people-group.component';
import { PopUpPhotoAvatarGroupComponent } from '../_pop-up/pop-up-photo-avatar-group/pop-up-photo-avatar-group.component';
import { FileService } from '../_services/file.service';

@Component({
  selector: 'app-edit-my-group',
  templateUrl: './edit-my-group.component.html',
  styleUrls: ['./edit-my-group.component.css']
})
export class EditMyGroupComponent implements OnInit {
  @ViewChild('photo') photoRef!: ElementRef
  @ViewChild('video') videoRef!: ElementRef

  editmode: boolean = false;
  group_info!: GroupInfo;
  last_index: string = '0';
  last_index_photo: string = '0';
  push_lenght: number = 1;
  push_lenght_photo: number = 1;
  group_record: GroupRecord[] = [];
  status: boolean = true;
  group_status:number=0;
  id: string = '0';

  show: boolean = false;
  loadImg: boolean = false;
  loadVideo: boolean = false;

  imgSrc: string | null = null;
  videoSrc: string | null = null;

  record:CreateRecordGroup= {
    id_group:'',
    text:'',
    img_src:null,
    video_src:null
  }

  constructor(private dialogRef: MatDialog, private group: GroupService, private route: ActivatedRoute, private router: Router, private uploadFile:FileService) { }
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
            this.record.id_group=params['id']
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
  openDialogPhotoAvatar(){
    this.dialogRef.open(PopUpPhotoAvatarGroupComponent, {
      data:this.group_info.group_logo_url,
      width: '70%'
    }).afterClosed().subscribe(
      ()=>{
        this.group.GroupInfo(this.id).subscribe(
          () => {
            this.last_index='0';
            this.group_record=[];
            this.group_info = this.group.getGroupInfo();
            console.log(this.group_info)
            if (!this.group_info) this.router.navigate(['/**'])
            this.getGroupRecord();
          });
        
        this.getGroupStatus(this.id)
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
  
  Save(){
    this.editGroupInfo();
    this.editmode = !this.editmode;
  }

  OpenPhotoDialog() {
    console.log(this.photoRef.nativeElement)
    this.photoRef.nativeElement.click();
  }
  photoEdit(event: any) {
    if (event.target.files.length != 0) {
      this.loadImg = true;
      const file = event.target.files[0];
      this.UploadFile(file, true);
    }
  }
  OpenVideoDialog() {
    this.videoRef.nativeElement.click();
  }
  videoEdit(event: any) {
    if (event.target.files.length != 0) {
      this.loadVideo = true;
      const file = event.target.files[0];
      this.UploadFile(file, false);
    }
  }
  UploadFile(file: File, data: boolean) {
    this.uploadFile.uploadData(file).subscribe(
      () => {
        if (data) { this.loadImg = false; this.imgSrc = this.uploadFile.getPath(); this.record.img_src="'"+this.imgSrc+"'"; console.log(this.imgSrc) }
        else { this.loadVideo = false; this.videoSrc = this.uploadFile.getPath(); this.record.video_src="'"+this.videoSrc+"'"}

      }
    )
  }
  editGroupInfo(){
    this.group.editGroupInfo(this.group_info).subscribe()
  }
  check(){
    if (this.editmode){
      this.group.GroupInfo(this.id).subscribe(
        () => {
          this.group_info = this.group.getGroupInfo();
          console.log(this.group_info)
          if (!this.group_info) this.router.navigate(['/**'])
        });
    }
  }
  createRecord(){
    this.group.createRecord(this.record).subscribe(
      ()=>{
        this.show=!this.show;
        this.last_index='0';
        this.group_record=[];
        this.getGroupRecord()
      }
    )
  }
  deleteGroup(){
    this.group.deleteGroup(this.id).subscribe(
      ()=>{
        this.router.navigate(['/group'])
      }
    );
  }
}
