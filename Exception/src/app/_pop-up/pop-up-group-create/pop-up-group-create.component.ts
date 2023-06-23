import { Component, OnInit } from '@angular/core';
import { CreateGroup } from '../../_interfaces/interface';
import { GroupService } from '../../_services/group.service';

@Component({
  selector: 'app-pop-up-group-create',
  templateUrl: './pop-up-group-create.component.html',
  styleUrls: ['./pop-up-group-create.component.css']
})
export class PopUpGroupCreateComponent implements OnInit {

  constructor(private group:GroupService) { }

  create_group:CreateGroup = {
    group_name:'',
    theme:''
  }

  ngOnInit(): void {
  }
  createGroup(){
    this.group.createGroup(this.create_group).subscribe();
  }

}
