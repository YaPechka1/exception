import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, tap } from 'rxjs';
import { MessageDialog, MessageLIst, MessageName, MessagePeople, MessageSubmit, PushMessage } from '../_interfaces/interface';
import { PathService } from './path.service';
import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message_list!: MessageLIst[];
  message_dialog!: MessageDialog[];
  message_people!: MessagePeople[];
  message_people_friend!: MessagePeople[];
  message_admin: boolean = false;

  // currentDocument = this.socket.fromEvent<any>('document');
  // documents = this.socket.fromEvent<string[]>('documents');


  constructor(private http: HttpClient, private path: PathService, private socket: Socket, private auth: AuthService) {

  }

  MessageList(): Observable<{ message_list: MessageLIst[] }> {
    return this.http.get<{ message_list: MessageLIst[] }>(this.path.path + 'api/message/getMessageList')
      .pipe(
        tap(
          ({ message_list }) => {
            this.message_list = message_list;
          }
        )
      );
  }
  getMessageList(): MessageLIst[] {
    return this.message_list
  }
  MessageDialog(message_submit: MessageSubmit): Observable<{ message_dialog: MessageDialog[] }> {
    return this.http.post<{ message_dialog: MessageDialog[] }>(this.path.path + 'api/message/getMessageDialog', message_submit)
      .pipe(
        tap(
          ({ message_dialog }) => {
            this.message_dialog = message_dialog;
          }
        )
      )
  }
  getMessageDialog(): MessageDialog[] {
    return this.message_dialog;
  }
  MessagePeople(id_message_list: string): Observable<{ message_people: MessagePeople[] }> {
    return this.http.post<{ message_people: MessagePeople[] }>(this.path.path + 'api/message/getMessagePeople', { id_message_list: id_message_list })
      .pipe(
        tap(
          ({ message_people }) => {
            this.message_people = message_people;
          }
        )
      )
  }
  getMessagePeople(): MessagePeople[] {
    return this.message_people;
  }
  MessageAdmin(id_message_list: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(this.path.path + 'api/message/getMessageAdmin', { id_message_list: id_message_list })
      .pipe(
        tap(
          ({ status }) => {
            this.message_admin = status;
          }
        )
      )
  }
  getMessageAdmin(): boolean {
    return this.message_admin
  }
  FriendNotFoundMessage(id_message_list: string): Observable<{ message_people: MessagePeople[] }> {
    return this.http.post<{ message_people: MessagePeople[] }>(this.path.path + 'api/message/getFriendNotFoundMessage', { id_message_list: id_message_list })
      .pipe(
        tap(
          ({ message_people }) => {
            this.message_people_friend = message_people;
          }
        )
      )
  }
  getFriendNotFoundMessage(): MessagePeople[] {
    return this.message_people_friend;
  }
  pushPeopleMessage(id_message_list: string, id_user: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(this.path.path + 'api/message/pushPeopleMessage', { id_message_list: id_message_list, id_user: id_user })
      .pipe(
        tap(
          ({ status }) => {
            console.log(status);
          }
        )
      )
  }
  deletePeopleMessage(id_message_list: string, id_user: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(this.path.path + 'api/message/deletePeopleMessage', { id_message_list: id_message_list, id_user: id_user })
      .pipe(
        tap(
          ({ status }) => {
            console.log(status);
          }
        )
      )
  }


  pushMessage(msg: PushMessage) {
    this.socket.emit('pushMes', msg);
  }
  connectMessage(id: string) {
    console.log(id);

    // setInterval(() => {


      this.socket.emit('connectQ', {id:id, token:localStorage.getItem('token')});

    // }, 5000)
  }
  getMessage() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('getMes', (msg: MessageDialog) => {
        observer.next(msg);
      });
    })
  }
updateMessageName(id_message_list:string, message_name:string){
  let message_name_submit:MessageName = {
    id_message_list:id_message_list,
    message_name:message_name
  }
  return this.http.post<{ status: boolean }>(this.path.path + 'api/message/updateNameMessage', message_name_submit)

}
pushMessageDialog(message_name:string){

  return this.http.post<{ status: boolean }>(this.path.path + 'api/message/pushMessageDialog', {message_name:message_name})

}
deleteMessageDialog(id_message_list:string){
  return this.http.post<{ status: boolean }>(this.path.path + 'api/message/deleteMessageDialog', {id_message_list:id_message_list})
}





}
