import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserLoginOnToken, UserReg } from '../_interfaces/interface';
import { PathService } from './path.service';
import { Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
private status: any;
private token:any = null;
private id_user:any = null;

message:string='';
// admin:boolean = false;

  constructor(private http: HttpClient, private path: PathService) { }

  login(user: UserLogin): Observable<{ token: string, id_user: string,tokenUpdate:string, id_role:string}> {
    console.log(user);
    return this.http.post<{ token: string, id_user:string, tokenUpdate:string, id_role:string }>(this.path.path + 'api/auth/login', user)
    .pipe(
      tap(
        ({token, id_user, tokenUpdate, id_role})=>{
          if (token!='false'){
            this.token = token;
            this.id_user = id_user;
            localStorage.setItem('token',token);
            localStorage.setItem('id_user',id_user);
            localStorage.setItem('tokenUpdate',tokenUpdate)
            localStorage.setItem('id_role',id_role)
          }
          console.log(token+"  <>  "+id_user);
          

    }))
  }
  
  reg(user: UserReg): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(this.path.path + 'api/auth/reg', user)
    .pipe(
      tap(
        ({status})=>{
          this.status = status
    }))
  }

  refreshToken(tokenUpdate: string, id_user:string) {
    
    // console.log(this.http.post(this.path.path+ 'api/auth/loginOnToken', {token:tokenUpdate, id_user:id_user}))
    return this.http.post(this.path.path+ 'api/auth/loginOnToken', {token:tokenUpdate, id_user:id_user} );
  }
  changeLogin(login:string, loginNew:string):Observable<{message:string}> {
    return this.http.post<{message:string}>(this.path.path+ 'api/auth/changeLogin', {login:login,loginNew:loginNew} )
    .pipe(
      tap(
        ({message})=>{
          this.message=message
        }
      )
    );
  }
  changePassword(password:string, passwordNew:string):Observable<{message:string}> {
    return this.http.post<{message:string}>(this.path.path+ 'api/auth/changePassword', {password:password,passwordNew:passwordNew} )
    .pipe(
      tap(
        ({message})=>{
          this.message=message
        }
      )
    );
  }
  getMessage():string{
    return this.message
  }

  getStatusReg(){
    return this.status
  }
  getToken(){
    return this.token
  }
  setToken(token:string){
    this.token = token;
  }
  isEnter():boolean{
    return !!localStorage.getItem('token') && localStorage.getItem('token')?.split(' ')[0]=='Bearer';
  }
  getAdmin():boolean{
    return localStorage.getItem('id_role')=='4'
  }
  deleteUser():Observable<{status:string}>{
    return this.http.get<{status:string}>(this.path.path+ 'api/auth/deleteUser')
  }
  genCode(login:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+'api/auth/generateCode', {login:login})
  }
  editPassword(code:string, password:string):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+'api/auth/editPassword', {login:localStorage.getItem('login'), code:code,password:password})
  }


}
