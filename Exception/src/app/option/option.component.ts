import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  message:string ='';
  messagePassword:string ='';
  form!: FormGroup
  formPassword!: FormGroup
  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      loginNew: new FormControl(null, [Validators.required, Validators.minLength(2)])
    })
    this.formPassword = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      passwordNew: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }
  onSubmit(){
    this.auth.changeLogin(this.form.value.login,this.form.value.loginNew ).subscribe(
      ()=>{
        this.message=this.auth.getMessage()
      }
    )
  }
  onSubmitPassword(){
    this.auth.changePassword(this.formPassword.value.password,this.formPassword.value.passwordNew ).subscribe(
      ()=>{
        this.messagePassword=this.auth.getMessage()
      }
    )
  }
  exit(){
    localStorage.clear();
    this.router.navigate(['/enter'])
  }
  deleteUser(){
    // this.auth.deleteUser().subscribe(
    //   ()=>{
    //     localStorage.clear()
    //     this.router.navigate(['/enter'])

    //   }
    // )
  }

}
