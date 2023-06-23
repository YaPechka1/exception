import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageDialog, PushMessage } from '../_interfaces/interface';
import { PopUpMessagePeopleComponent } from '../_pop-up/pop-up-message-people/pop-up-message-people.component';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from '../_services/file.service';
import { Observable, Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.css']
})

export class MessageViewerComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

  @ViewChild('dialog') dialog!: ElementRef;

  documents!: Observable<string[]>;
  currentDoc!: string;



  check: boolean = true;
  imgSrc: string | null = null;
  videoSrc: string | null = null;
  constructor(private dialogRef: MatDialog, private message: MessageService, private socket: Socket,
    private route: ActivatedRoute, private router: Router, private uploadFile: FileService) {

  }
  enter(event:any){
    event.preventDefault();
    console.log("You entered: ", this.text.length+" <> "+this.text.split('\n').length);
    let textMas = this.text.split('\n');
    // console.log(textMas)
    for (let i=0;i<textMas.length;i++){
      // console.log(textMas[i].trim())
      if (textMas[i].trim().length>0) {
        this.pushMessage(); break
      }
    }
  }
  ngAfterContentInit(): void {
    // console.log(this.dialog.nativeElement.scrollHeight);
  }
  openDialogPeople() {
    this.dialogRef.open(PopUpMessagePeopleComponent, { width: '75%' })
  }
  ngAfterViewInit(): void {
    this.dialog.nativeElement.style.opacity = 0;
    setTimeout(() => {
      this.dialog.nativeElement.scrollTop = this.dialog.nativeElement.scrollHeight;
      this.dialog.nativeElement.style.opacity = 1;
    }, 1000)
    console.log(this.dialog.nativeElement.scrollHeight)
    this.dialog.nativeElement.scrollTop = this.dialog.nativeElement.scrollHeight;

    // this.dialog.nativeElement.scrollIntoView();
    this.dialog.nativeElement.addEventListener('load', () => {
      console.log(245);
      this.dialog.nativeElement.scrollTop = this.dialog.nativeElement.scrollHeight;
    })

  }

  text: string = '';
  id_user: string = localStorage.getItem('id_user') || '';
  message_dialog: MessageDialog[] = [];
  last_index: number = 0;
  id_message_list: number = 0;
  message_name: string = '';
  show: boolean = false;
  loadImg: boolean = false;
  loadVideo: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['id'] && params['message_name']) {
        this.id_message_list = params['id'];
        this.message_name = params['message_name'];
        this.MessageDialog();
        this.message.connectMessage(params['id'])
        this.getMessage();


      }
      else {
        this.router.navigate(['/message']);
      }

    })
  }

  ngOnDestroy() {

  }

  MessageDialog() {
    this.check = true;
    console.log("scroll?")
    this.message.MessageDialog({ id_message_list: this.id_message_list + '', last_index: this.last_index + '' }).subscribe(
      () => {
        if (this.message_dialog.length == 0) { this.message_dialog = this.message.getMessageDialog().reverse(); }
        else {
          for (let i = 0; i < this.message.getMessageDialog().length; i++) {
            this.message_dialog.unshift(this.message.getMessageDialog()[i]);
          }
        }
        this.last_index = Number(this.message_dialog[0].id_message);
        this.check = this.message.getMessageDialog().length == 0;
        console.log(this.message_dialog);
      }
    )
  }

  @ViewChild('photo') photoRef!: ElementRef
  @ViewChild('video') videoRef!: ElementRef

  OpenPhotoDialog() {
    console.log(this.photoRef.nativeElement)
    this.photoRef.nativeElement.click();
  }
  photoEdit(event: any) {
    if (event.target.files.length != 0) {
      this.loadImg = true;
      const file = event.target.files[0];
      this.UploadFile(file, true);
    }
  }
  OpenVideoDialog() {
    this.videoRef.nativeElement.click();
  }
  videoEdit(event: any) {
    if (event.target.files.length != 0) {
      this.loadVideo = true;
      const file = event.target.files[0];
      this.UploadFile(file, false);
    }
  }
  UploadFile(file: File, data: boolean) {
    this.uploadFile.uploadData(file).subscribe(
      () => {
        if (data) { this.loadImg = false; this.imgSrc = this.uploadFile.getPath(); console.log(this.imgSrc) }
        else { this.loadVideo = false; this.videoSrc = this.uploadFile.getPath(); }

      }
    )
  }
  pushMessage() {
    // console.log(this.videoSrc)

    if (this.imgSrc != null) this.imgSrc = "'" + this.imgSrc + "'";
    if (this.videoSrc != null) this.videoSrc = "'" + this.videoSrc + "'";
    // console.log(this.videoSrc)
    this.message.pushMessage({ id_message_list: this.id_message_list + '', id_user: localStorage.getItem('id_user'), text: this.text, img_src: this.imgSrc, video_src: this.videoSrc })
    this.text = '';
    this.imgSrc = null;
    this.videoSrc = null;
  }
  getMessage() {
    this.message.getMessage().subscribe(
      (msg: MessageDialog) => {
        if (Number(msg.id_message_list) ==this.id_message_list){
          this.message_dialog.push(msg);
          console.log(msg);
          setTimeout(() => {
            this.dialog.nativeElement.scrollTo({
              top: this.dialog.nativeElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 250)
        }
      }
    );
  }





}
