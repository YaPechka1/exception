import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  form!: FormGroup
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('login')){
      this.router.navigate(['/enter/forget'])
    }
    this.form = new FormGroup({
      password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
      code: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit(){
    this.auth.editPassword(this.form.value.code,this.form.value.password).subscribe(
      ()=>{
        localStorage.clear();
        this.router.navigate(['/enter'])
      }
    )
  }

}
