import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-pop-up-plus-message',
  templateUrl: './pop-up-plus-message.component.html',
  styleUrls: ['./pop-up-plus-message.component.css']
})
export class PopUpPlusMessageComponent implements OnInit {

  constructor(private message:MessageService) { }
  name_message:string='';
  ngOnInit(): void {
  }
  pushMessageDialog(){
    this.message.pushMessageDialog(this.name_message).subscribe();
  }

}
