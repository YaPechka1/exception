import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PathService } from './path.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private path: PathService) { }

  deleteUser(id_user:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+'api/admin/deleteUser',{id_user:id_user})
  }
  deleteGroup(id_group:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+'api/admin/deleteGroup',{id_group:id_group})
  }
}
