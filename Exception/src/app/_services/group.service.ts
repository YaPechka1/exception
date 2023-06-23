import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CreateGroup, CreateRecordGroup, GroupImg, GroupInfo, GroupList, GroupListAdmin, GroupPeople, GroupRecord, GroupVideo, SearchGroup} from '../_interfaces/interface';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  group_list!: GroupList[];
  group_list_all!: GroupList[];
  group_list_admin!: GroupListAdmin[];
  group_info!: GroupInfo;
  group_record!: GroupRecord[];
  group_img!: GroupImg[];
  group_video!: GroupVideo[];
  group_people:GroupPeople[]=[];
  group_status:number = 0;

  constructor(private http: HttpClient, private path: PathService) { }

  UserGroupList(): Observable<{ group_list: GroupList[] }> {
    return this.http.get<{ group_list: GroupList[] }>(this.path.path + 'api/group/getUserGroup')
      .pipe(
        tap(
          ({ group_list }) => {
            this.group_list = group_list;
            console.log(this.group_list)
          }
        )
      );
  }
  getUserGroupList(): GroupList[] {
    return this.group_list
  }
  UserGroupListAdmin(): Observable<{ group_list_admin: GroupListAdmin[] }> {
    return this.http.get<{ group_list_admin: GroupListAdmin[] }>(this.path.path + 'api/group/getUserGroupAdmin')
      .pipe(
        tap(
          ({ group_list_admin }) => {
            this.group_list_admin = group_list_admin

          }
        )
      );
  }
  getUserGroupListAdmin(): GroupListAdmin[] {
    return this.group_list_admin
  }
  getGroups(last_index: { last_index: string }): Observable<{ group_list_all: GroupList[] }> {
    return this.http.post<{ group_list_all: GroupList[] }>(this.path.path + 'api/group/getGroupAll', last_index)
      .pipe(
        tap(
          ({ group_list_all }) => {
            this.group_list_all = group_list_all
          }))
  }
  getGroupList(): GroupList[] {
    return this.group_list_all;
  }
  searchGroup(group_search: SearchGroup): Observable<{ group_list_all: GroupList[] }> {
    return this.http.post<{ group_list_all: GroupList[] }>(this.path.path + 'api/group/searchGroups', group_search)
      .pipe(
        tap(
          ({ group_list_all }) => {
            this.group_list_all = group_list_all;
          }))
  }

  GroupInfo(id_group: string): Observable<{ group_info: GroupInfo }> {
    return this.http.post<{ group_info: GroupInfo }>(this.path.path + 'api/group/getGroupInfo', { id_group: id_group })
      .pipe(
        tap(
          ({ group_info }) => {
            console.log(group_info)
            this.group_info = group_info
          }))
  }
  editGroupInfo(group_info:GroupInfo):Observable<{status:string}>{
    return this.http.post<{status:string}>(this.path.path+'api/group/editGroupInfo', group_info)
  }
  getGroupInfo(): GroupInfo {
    return this.group_info;
  }
  GroupNews(id_group: string, last_index: string): Observable<{ group_record: GroupRecord[] }> {
    return this.http.post<{ group_record: GroupRecord[] }>(this.path.path + 'api/group/getGroupRecord', { id_group: id_group, last_index: last_index })
      .pipe(
        tap(
          ({ group_record }) => {
            this.group_record = group_record;

          }))
  }
  getGroupNews(): GroupRecord[] {
    return this.group_record;
  }

  GroupImg(id_group: string, last_index: string, limit: string): Observable<{ group_img: GroupImg[] }> {
    return this.http.post<{ group_img: GroupImg[] }>(this.path.path + 'api/group/getGroupImg', { id_group: id_group, last_index: last_index, limit: limit })
      .pipe(
        tap(
          ({ group_img }) => {
            this.group_img = group_img;

          }))
  }
  getGroupImg(): GroupImg[] {
    return this.group_img;
  }
  GroupVideo(id_group: string, last_index: string, limit: string): Observable<{ group_video: GroupVideo[] }> {
    return this.http.post<{ group_video: GroupVideo[] }>(this.path.path + 'api/group/getGroupVideo', { id_group: id_group, last_index: last_index, limit: limit })
      .pipe(
        tap(
          ({ group_video }) => {
            this.group_video = group_video;

          }))
  }
  getGroupVideo(): GroupVideo[] {
    return this.group_video;
  }
  GroupPeople(id_group: string, last_index: string): Observable<{ group_people: GroupPeople[] }> {
    return this.http.post<{  group_people: GroupPeople[] }>(this.path.path + 'api/group/getGroupPeople', { id_group: id_group, last_index: last_index})
      .pipe(
        tap(
          ({ group_people }) => {
            this.group_people = group_people;
            console.log(group_people);
          }))
  }
  getGroupPeople():GroupPeople[]{
    return this.group_people;
  }
  GroupSatus(id_group:string):Observable<{status:number}>{
    return this.http.post<{status:number}>(this.path.path + 'api/group/getGroupStatus', { id_group: id_group})
      .pipe(
        tap(
          ({ status }) => {
            this.group_status = status;
        
          }))
  }
  getGroupStatus():number{
    return this.group_status
  }
  pushPeople(id_group:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+ 'api/group/pushPeople', { id_group: id_group})
  }
  deletePeople(id_group:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+ 'api/group/deletePeople', { id_group: id_group})
  }
  editGroupAvatar(id_group:string, img_src:string):Observable<{status:string}>{
    console.log(img_src)
    return this.http.post<{status:string}>(this.path.path+'api/group/editGroupAvatar', {id_group:id_group,img_src:img_src});
  }
  createRecord(record:CreateRecordGroup):Observable<{status:string}>{
    return this.http.post<{status:string}>(this.path.path+'api/group/createRecord',record)
  }
  createGroup(create_group:CreateGroup):Observable<{status:string}>{
    return this.http.post<{status:string}>(this.path.path+'api/group/createGroup',create_group)
  }
  deleteGroup(id_group:string):Observable<{status:string}>{
    return this.http.post<{status:string}>(this.path.path+'api/group/deleteGroup',{id_group:id_group})
  }
}
