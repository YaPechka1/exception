import { Component, OnInit } from '@angular/core';
import { MessageLIst } from '../_interfaces/interface';
import { MessageService } from '../_services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpPlusMessageComponent } from '../_pop-up/pop-up-plus-message/pop-up-plus-message.component';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  search:any;
  message_list!:MessageLIst[];
  cont: any 
  
  constructor(private message:MessageService, private dialogRef: MatDialog) {   }

  ngOnInit(): void {
    
    this.getMessageList();
    this.cont= document.getElementById('cont');
  }
  getMessageList(){
    this.message.MessageList().subscribe(
      ()=>{
        this.message_list =this.message.getMessageList();

      }
    );
  }

  pushMessageDialog(){
    this.dialogRef.open(PopUpPlusMessageComponent).afterClosed().subscribe(
      ()=>{
        setTimeout(
          ()=>{
            this.getMessageList();

          }, 250
        )
      }
    )

  }

}
