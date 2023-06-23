import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PathService } from './path.service';
import { FeedBack } from '../_interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  pathOnServer:any=null

  constructor(private http: HttpClient, private path: PathService) { }
  uploadData(file:File):Observable<{path:string}>{
    let form = new FormData();
    form.append('media', file);
    return this.http.post<{path:string}>(this.path.path + 'api/file/uploadData', form)
    .pipe(
      tap(
        ({path})=>{
          this.pathOnServer=path;
    }))
  }
  getPath():any{
    return this.pathOnServer
  }
  feedback(feedback:FeedBack):Observable<{message:string}>{
    return this.http.post<{message:string}>(this.path.path+'api/file/feedback',feedback)
  }

}
