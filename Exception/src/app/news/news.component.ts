import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpPlusZapComponent } from '../_pop-up/pop-up-plus-zap/pop-up-plus-zap.component';
import { RecordList, getUserNewsOnSubmit } from '../_interfaces/interface';
import { NewsService } from '../_services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  status: boolean = true;

  record_list: RecordList[] = [];

  last_index: string = '0';
  last_type: string = '';
  get_user_record_on_submit!: getUserNewsOnSubmit;

  push_lenght: number = 1;

  target: number = 0;

  constructor(private dialogRef: MatDialog, private news: NewsService) { }

  getUserRecord(last_index: string, last_type: string) {
    if (this.push_lenght != 0) {
      this.get_user_record_on_submit = {
        last_index: last_index,
        last_type: last_type
      }
      this.news.UserNews(this.get_user_record_on_submit).subscribe(
        () => {
          this.push_lenght = this.news.getUserNews().length;
          for (let i = 0; i < this.news.getUserNews().length; i++) {
            this.record_list.push(this.news.getUserNews()[i]);
          }
          this.last_index = this.record_list[this.record_list.length - 1].id_record;
          this.last_type = this.record_list[this.record_list.length - 1].type;
          this.status = true;
          //this.tabs=1;
        }
      )
    }
  }
  getUserRecordFriends(last_index: string, last_type: string) {
    if (this.push_lenght != 0) {
      this.get_user_record_on_submit = {
        last_index: last_index,
        last_type: last_type
      }
      this.news.UserNewsFriends(this.get_user_record_on_submit).subscribe(
        () => {
          this.push_lenght = this.news.getUserNews().length;
          for (let i = 0; i < this.news.getUserNews().length; i++) {
            this.record_list.push(this.news.getUserNews()[i]);
          }
          this.last_index = this.record_list[this.record_list.length - 1].id_record;
          this.last_type = this.record_list[this.record_list.length - 1].type;
          this.status = true;
          //this.tabs=1;
        }
      )
    }
  }
  getUserRecordGroups(last_index: string, last_type: string) {
    if (this.push_lenght != 0) {
      this.get_user_record_on_submit = {
        last_index: last_index,
        last_type: last_type
      }
      this.news.UserNewsGroups(this.get_user_record_on_submit).subscribe(
        () => {
          this.push_lenght = this.news.getUserNews().length;
          for (let i = 0; i < this.news.getUserNews().length; i++) {
            this.record_list.push(this.news.getUserNews()[i]);
          }
          this.last_index = this.record_list[this.record_list.length - 1].id_record;
          this.last_type = this.record_list[this.record_list.length - 1].type;
          this.status = true;
          //this.tabs=1;
        }
      )
    }
  }
  Reset(index: number) {
    this.target = index;
    this.last_index = '0';
    this.last_type = '';
    this.record_list = [];
    this.status = false;
    this.push_lenght=1;
    switch (index) {
      case 0: this.getUserRecord(this.last_index, this.last_type); break;
      case 1: this.getUserRecordFriends(this.last_index, this.last_type); break;
      case 2: this.getUserRecordGroups(this.last_index, this.last_type); break;
    }
  }
  onScroll() {
    this.status = false;
    switch (this.target) {
      case 0: this.getUserRecord(this.last_index, this.last_type); break;
      case 1: this.getUserRecordFriends(this.last_index, this.last_type); break;
      case 2: this.getUserRecordGroups(this.last_index, this.last_type); break;
    }

  }

  openCreateZap() {
    this.dialogRef.open(PopUpPlusZapComponent, { width: '75%' },).afterClosed().subscribe(
      () => {
        console.log(12);
        if (this.news.target) this.Reset(0);
        this.news.target = false;
      }
    )
  }

  ngOnInit(): void {
    this.getUserRecord(this.last_index, this.last_type);
  }

}
