import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FileService } from '../../_services/file.service';
import { NewsService } from '../../_services/news.service';
import { PathService } from '../../_services/path.service';

@Component({
  selector: 'app-pop-up-plus-zap',
  templateUrl: './pop-up-plus-zap.component.html',
  styleUrls: ['./pop-up-plus-zap.component.css']
})
export class PopUpPlusZapComponent implements OnInit {

  server: string = '';

  status: boolean = false;
  text: string = '';

  img!: File
  imgSrc: any = null;
  loadImg: boolean = false;

  video!: File
  videoSrc: any = null;
  loadVideo: boolean = false;

  constructor(private uploadFile: FileService, private news: NewsService, private router: Router) { }

  @ViewChild('photo') photoRef!: ElementRef
  @ViewChild('video') videoRef!: ElementRef
  @ViewChild('close') closeRef!: ElementRef

  ngOnInit(): void {

  }
  OpenPhotoDialog() {
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
  CreateRecord() {
    let img_src: string = '';
    let video_src: string = '';
    let text_text: string = '';
    if (this.imgSrc == null) img_src = 'null'; else img_src = "'" + this.imgSrc + "'";
    if (this.videoSrc == null) video_src = 'null'; else video_src = "'" + this.videoSrc + "'";
    if (this.text == null) text_text = 'null'; else text_text = "'" + this.text + "'";
    this.news.CreateRecord({ text: text_text, img_src: img_src, video_src: video_src }).subscribe(
      () => {
        this.news.target=true;
        this.closeRef.nativeElement.click();
      }
    );
  }

}
