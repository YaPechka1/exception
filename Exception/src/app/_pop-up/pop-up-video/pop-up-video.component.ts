import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-pop-up-video',
  templateUrl: './pop-up-video.component.html',
  styleUrls: ['./pop-up-video.component.css']
})
export class PopUpVideoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialog) { }
  video_src:string='';
  show:boolean=false;
  ngOnInit(): void {
    console.log(this.data)
  }

}
