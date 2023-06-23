import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  form!: FormGroup
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null,[Validators.required, Validators.minLength(2)])
    })
  }
  onSubmit(){
    this.auth.genCode(this.form.value.login).subscribe(
      ()=>{
        localStorage.setItem('login',this.form.value.login)
        this.router.navigate(['/enter/recovery'])
      }
    )
  }

}
