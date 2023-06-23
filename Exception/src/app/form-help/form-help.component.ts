import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../_services/file.service';
import { FeedBack } from '../_interfaces/interface';
@Component({
  selector: 'app-form-help',
  templateUrl: './form-help.component.html',
  styleUrls: ['./form-help.component.css']
})
export class FormHelpComponent implements OnInit {
  form!: FormGroup
  constructor(private file:FileService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      theme: new FormControl(null,[Validators.required]),
      mail: new FormControl(null,[Validators.required,Validators.email]),
      url: new FormControl(null,[Validators.required]),
      text: new FormControl(null,[Validators.required])
    })
  }
  onSubmit(){
    let feedback:FeedBack = {
      theme: this.form.value.theme,
      mail: this.form.value.mail,
      url:this.form.value.url,
      text:this.form.value.text,
    }
    this.file.feedback(feedback).subscribe(
      ()=>{
        this.form.reset()
      }

    );
  }
  
}
