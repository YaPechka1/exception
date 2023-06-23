import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupPeople } from '../../_interfaces/interface';
import { GroupService } from '../../_services/group.service';

@Component({
  selector: 'app-pop-up-people-group',
  templateUrl: './pop-up-people-group.component.html',
  styleUrls: ['./pop-up-people-group.component.css']
})
export class PopUpPeopleGroupComponent implements OnInit {

  constructor(private group: GroupService, private route: ActivatedRoute) { }

  last_index: string = '0';
  push_lenght: number = 1;
  group_people: GroupPeople[] = [];
  status: boolean = true;
  id: string = '';
  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id']) { this.getGroupPeople(params['id'], this.last_index); this.id = params['id']; }
    })

  }
  getGroupPeople(id: string, last_index: string) {
    this.status=false;
    this.group.GroupPeople(id, last_index).subscribe(
      () => {
        this.push_lenght = this.group.getGroupPeople().length;
        if (this.push_lenght != 0) {
          for (let i = 0; i < this.group.getGroupPeople().length; i++) {
            // console.log(this.group.getGroupNews());
            this.group_people.push(this.group.getGroupPeople()[i]);
          }
          this.last_index = this.group_people[this.group_people.length - 1].id_group_people;
          this.status = true;
        }
        //this.tabs=1;
      }
    )
  }
  onScrollTemp() {
    console.log(12);
    console.log(this.group_people.length);
    if (this.status) this.getGroupPeople(this.id, this.last_index);
  }
  
}
