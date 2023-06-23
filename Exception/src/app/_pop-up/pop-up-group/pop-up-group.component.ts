import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-group',
  templateUrl: './pop-up-group.component.html',
  styleUrls: ['./pop-up-group.component.css']
})
export class PopUpGroupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  ngOnInit(): void {
    console.log(this.data)
  }

}
