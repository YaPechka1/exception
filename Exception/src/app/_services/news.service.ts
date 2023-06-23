import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CreateRecord, getUserNewsOnSubmit, RecordList } from '../_interfaces/interface';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  record_list!: RecordList[]
  target:boolean=false;

  constructor(private http: HttpClient, private path: PathService) { }
  UserNews(get_user_news_on_submit: getUserNewsOnSubmit): Observable<{ record_list: RecordList[] }> {
    return this.http.post<{ record_list: RecordList[] }>(this.path.path + 'api/news/getUserNews', get_user_news_on_submit)
      .pipe(
        tap(
          ({ record_list }) => {
            this.record_list = record_list;
            console.log(record_list.length);
          }))
  }
  UserNewsFriends(get_user_news_on_submit: getUserNewsOnSubmit): Observable<{ record_list: RecordList[] }> {
    return this.http.post<{ record_list: RecordList[] }>(this.path.path + 'api/news/getUserNewsFriends', get_user_news_on_submit)
      .pipe(
        tap(
          ({ record_list }) => {
            this.record_list = record_list;
            console.log(record_list);
          }))
  }
  UserNewsGroups(get_user_news_on_submit: getUserNewsOnSubmit): Observable<{ record_list: RecordList[] }> {
    return this.http.post<{ record_list: RecordList[] }>(this.path.path + 'api/news/getUserNewsGroups', get_user_news_on_submit)
      .pipe(
        tap(
          ({ record_list }) => {
            this.record_list = record_list;
            console.log(record_list);
          }))
  }
  getUserNews(): RecordList[] {
    return this.record_list
  }
  CreateRecord(create_record: CreateRecord): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(this.path.path + 'api/news/createRecord', create_record)
      .pipe(
        tap(
          ({ status }) => {
            console.log(status);
          }))
  }


}
