import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SearchUser, UserList } from '../_interfaces/interface';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  user_list:UserList[]=[];
  user_application:UserList[]=[];
  user_my:UserList[]=[];

  constructor(private http: HttpClient, private path: PathService) { }
  
  getUsers(last_index:{last_index:string}):Observable<{user_list:UserList[]}>{
    return this.http.post<{user_list:UserList[]}>(this.path.path + 'api/friend/getUsers', last_index)
    .pipe(
      tap(
        ({user_list})=>{
          this.user_list=user_list;
    }))
  }
  getUserList():UserList[]{
    return this.user_list;
  }
  searchUser(user_search:SearchUser):Observable<{user_list:UserList[]}>{
    return this.http.post<{user_list:UserList[]}>(this.path.path + 'api/friend/searchUsers', user_search)
    .pipe(
      tap(
        ({user_list})=>{
          this.user_list=user_list;
    }))
  }
  FriendApplication():Observable<{user_list:UserList[]}>{
    return this.http.get<{user_list:UserList[]}>(this.path.path+'api/friend/getFriendApplication')
    .pipe(
      tap(
        ({user_list})=>{
          this.user_application=user_list;
        }
      )
    )
  }
  getFriendApplication():UserList[]{
    return this.user_application;
  }
  MyApplication():Observable<{user_list:UserList[]}>{
    return this.http.get<{user_list:UserList[]}>(this.path.path+'api/friend/getMyApplication')
    .pipe(
      tap(
        ({user_list})=>{
          this.user_my=user_list;
        }
      )
    )
  }
  getMyApplication():UserList[]{
    return this.user_my;
  }
  deleteFriend(id_user:string){
    return this.http.post<{user_list:UserList[]}>(this.path.path + 'api/friend/deleteFriend', {id_user:id_user})
  }
  deleteApplication(id_user:string){
    return this.http.post<{user_list:UserList[]}>(this.path.path + 'api/friend/deleteApplication', {id_user:id_user})
  }
  deleteMyApplication(id_user:string){
    return this.http.post<{user_list:UserList[]}>(this.path.path + 'api/friend/deleteMyApplication', {id_user:id_user})
  }
  acceptApplication(id_user:string){
    return this.http.post<{user_list:UserList[]}>(this.path.path + 'api/friend/acceptApplication', {id_user:id_user})
  }
  pushFriend(id_user:string){
    return this.http.post<{message:string}>(this.path.path + 'api/friend/pushFriend', {id_user:id_user})
    
  }
}
