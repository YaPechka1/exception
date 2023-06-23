import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { MessagePeople } from '../../_interfaces/interface';
import { MessageService } from '../../_services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpMessagePlusPeopleComponent } from '../pop-up-message-plus-people/pop-up-message-plus-people.component';

@Component({
  selector: 'app-pop-up-message-people',
  templateUrl: './pop-up-message-people.component.html',
  styleUrls: ['./pop-up-message-people.component.css']
})
export class PopUpMessagePeopleComponent implements OnInit {

  constructor(private router: Router, private dialogRef: MatDialog, private route: ActivatedRoute, private message: MessageService) { }

  id_user:string | null= localStorage.getItem('id_user')
  id_message_list: string = '';
  message_people: MessagePeople[] = [];
  status: boolean = false;
  btnList:string[] = [];
  name_message:string ='';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id'] && params['message_name']) {
        this.name_message=params['message_name'];
        this.id_message_list = params['id'];
        this.getPeople();
      }
      this.getAdmin();
    })
  }
  getAdmin() {
    this.message.MessageAdmin(this.id_message_list).subscribe(
      () => {
        this.status = this.message.getMessageAdmin();
      }
    )
  }
  openModal() {
    this.dialogRef.open(PopUpMessagePlusPeopleComponent, { width: '75%' },).afterClosed().subscribe(
      () => {
        console.log(12);
        this.getPeople();
        this.btnList=[];
      }
    )
  }
  getPeople() {
    this.message.MessagePeople(this.id_message_list).subscribe(
      () => {
        this.message_people = this.message.getMessagePeople();
      }
    )
  }
  
  deletePeopleMessage(id_user:string, id_btn:string){
    this.message.deletePeopleMessage(this.id_message_list, id_user).subscribe(
      ()=>{
        document.getElementById(id_btn)?.classList.add('dis');
        this.btnList.push(id_btn);
      }
    )
  }
  getDisabled(id_btn:string):boolean{
    for (let i=0;i<this.btnList.length;i++){
      if (this.btnList[i]==id_btn) return true;
    }
    return false;
  }
  editName(){
    
      let paramsNew:Params = {
        id:this.id_message_list,
        message_name:this.name_message
      };
      this.message.updateMessageName(this.id_message_list,this.name_message).subscribe(
        ()=>{
          this.router.navigate(
            [], 
            {
              relativeTo: this.route,
              queryParams: paramsNew, 
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
        }
      );
      // paramsNew['message_name']=this.name_message

    
  }
  deleteMessageDialog(){
    console.log(12221121221)
    this.message.deleteMessageDialog(this.id_message_list).subscribe(
      ()=>{
        this.router.navigate(['/message'])
      }
    )
  }
}
