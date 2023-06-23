import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-photo',
  templateUrl: './pop-up-photo.component.html',
  styleUrls: ['./pop-up-photo.component.css']
})
export class PopUpPhotoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialog) { }
  
  ngOnInit(): void {
    console.log(this.data);
  }
  img_src:string='';
  show:boolean=false;
}
