import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EditUserInfo, UserFriend, UserGroup, userPhotoAndVideo, userRecord, user_information } from '../_interfaces/interface';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  response: any;
  constructor(private http: HttpClient, private path: PathService) { }

  user_info!: user_information;
  user_info_people!:user_information;
  user_record!: userRecord[];
  user_record_people!:userRecord[]
  user_photo_and_video!: userPhotoAndVideo
  user_photo_and_video_people!:userPhotoAndVideo
  user_friend!:UserFriend[];
  user_friend_people!:UserFriend[];
  user_group!: UserGroup[];
  user_group_people!: UserGroup[];
  status_friend:number=2;


  UserInfo(): Observable<{ user_data: user_information }> {
    return this.http.get<{ user_data: user_information }>(this.path.path + 'api/user_info/getUserInfo')
      .pipe(
        tap(
          ({ user_data }) => {

            this.user_info = user_data;
          }
        )
      );
  }
  getUserInfo(): user_information {
    return this.user_info
  }

  UserRecord(): Observable<{ user_record: userRecord[] }> {
    return this.http.get<{ user_record: userRecord[] }>(this.path.path + 'api/user_info/getUserRecord')
      .pipe(
        tap(
          ({ user_record }) => {
            this.user_record = user_record;
          }
        )
      );
  }
  getUserRecord(): userRecord[] {
    return this.user_record;
  }


  UserPhotoAndVideo(): Observable<{ user_photo_and_video: userPhotoAndVideo }> {
    return this.http.get<{ user_photo_and_video: userPhotoAndVideo }>(this.path.path + 'api/user_info/getUserPhotoAndVideo')
      .pipe(
        tap(
          ({ user_photo_and_video }) => {

            this.user_photo_and_video = user_photo_and_video
          
          }
        )
      );
  }
  getUserPhotoAndVideo(): userPhotoAndVideo {
    return this.user_photo_and_video;
  }


  UserFriend(): Observable<{user_friend: UserFriend[]}>{
    return this.http.get<{user_friend:UserFriend[]}>(this.path.path+'api/user_info/getUserFriend')
      .pipe(
        tap(
          ({user_friend})=>{
          this.user_friend=user_friend
          }
        )
      )
  }
  getUserFriend():UserFriend[]{
    return this.user_friend;
  }

  UserGroup():Observable<{user_group:UserGroup[]}>{
    return this.http.get<{user_group:UserGroup[]}>(this.path.path+'api/user_info/getUserGroup')
    .pipe(
      tap(
        ({user_group})=>{
          this.user_group = user_group
        }
      )
    )
  }
  getUserGroup():UserGroup[]{
    return this.user_group;
  }

  editUserInfo(edit_user_info: EditUserInfo): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(this.path.path + 'api/user_info/editUserInfo', edit_user_info)
    .pipe(
      tap(
        ({status})=>{
          console.log(status);
    }))
  }
  editUserAvatar(edit_user_avatar:{edit_user_avatar:string}):Observable<{status:string}>{
    return this.http.post<{status:string}>(this.path.path + 'api/user_info/editUserAvatar', edit_user_avatar)
    .pipe(
      tap(
        ({status})=>{
          console.log(status);
    }))
  }


  UserInfoPeople(id_user:string): Observable<{ user_data: user_information }> {
    return this.http.post<{ user_data: user_information }>(this.path.path + 'api/user_info/getUserInfoPeople',{id_user:id_user})
      .pipe(
        tap(
          ({ user_data }) => {

            this.user_info_people = user_data;
          }
        )
      );
  }
  getUserInfoPeople(): user_information {
    return this.user_info_people
  }
  UserRecordPeople(id_user:string): Observable<{ user_record: userRecord[] }> {
    return this.http.post<{ user_record: userRecord[] }>(this.path.path + 'api/user_info/getUserRecordPeople',{id_user:id_user})
      .pipe(
        tap(
          ({ user_record }) => {
            this.user_record_people = user_record;
          }
        )
      );
  }
  getUserRecordPeople(): userRecord[] {
    return this.user_record_people;
  }
  UserPhotoAndVideoPeople(id_user:string): Observable<{ user_photo_and_video: userPhotoAndVideo }> {
    return this.http.post<{ user_photo_and_video: userPhotoAndVideo }>(this.path.path + 'api/user_info/getUserPhotoAndVideoPeople',{id_user:id_user})
      .pipe(
        tap(
          ({ user_photo_and_video }) => {

            this.user_photo_and_video_people = user_photo_and_video
          
          }
        )
      );
  }
  getUserPhotoAndVideoPeople(): userPhotoAndVideo {
    return this.user_photo_and_video_people;
  }
  UserFriendPeople(id_user:string): Observable<{user_friend: UserFriend[]}>{
    return this.http.post<{user_friend:UserFriend[]}>(this.path.path+'api/user_info/getUserFriendPeople',{id_user:id_user})
      .pipe(
        tap(
          ({user_friend})=>{
          this.user_friend_people=user_friend
          }
        )
      )
  }
  getUserFriendPeople():UserFriend[]{
    return this.user_friend_people;
  }

  UserGroupPeople(id_user:string):Observable<{user_group:UserGroup[]}>{
    return this.http.post<{user_group:UserGroup[]}>(this.path.path+'api/user_info/getUserGroupPeople',{id_user:id_user})
    .pipe(
      tap(
        ({user_group})=>{
          this.user_group_people = user_group
        }
      )
    )
  }
  getUserGroupPeople():UserGroup[]{
    return this.user_group_people;
  }
  UserFriendStatus(id_user:string):Observable<{status:number}>{
    return this.http.post<{status:number}>(this.path.path+'api/user_info/getFriendStatus',{id_user:id_user})
    .pipe(
      tap(
        ({status})=>{
          this.status_friend=status
        }
      )
    )
  }
  getUserFriendStatus():number{
    return this.status_friend
  }
}
