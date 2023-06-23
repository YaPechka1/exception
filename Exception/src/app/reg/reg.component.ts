import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserReg } from '../_interfaces/interface';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit,OnDestroy {
  form!: FormGroup
  aSub!:Subscription
  status: any =''

  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null,[Validators.required, Validators.minLength(2)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      passwordrep: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      nick_name: new FormControl(null,[Validators.required, Validators.minLength(2)]),
      email:new FormControl(null,[Validators.required, Validators.email]),
    })
  }
  ngOnDestroy(): void {
    if (this.aSub) this.aSub.unsubscribe();
  }
  onSubmit(){
    const user: UserReg = {
      login: this.form.value.login,
      password: this.form.value.password,
      nick_name: this.form.value.nick_name,
      mail: this.form.value.email
    }
    
    this.aSub =  this.auth.reg(user).subscribe(
      ()=>{ this.status = this.auth.getStatusReg();
        if (this.status == true) this.router.navigate(['/enter']);},
      error=>{
        console.warn(error);
      }
    )
    

  }
  }
