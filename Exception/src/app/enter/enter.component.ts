import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../_interfaces/interface';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {
  form!: FormGroup
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })

  }
  message: string = '';
  onSubmit() {
    console.log(this.message + "  <>");
    const user: UserLogin = {
      login: this.form.value.login,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(
      () => {
        console.log('Yraaa');
        if (localStorage.getItem('token') == 'false' || !localStorage.getItem('token')) {
          this.message = 'неверный логин или пароль';
        }
        else {
          this.router.navigate(['/profile'])
          this.message = '';
        }

      }
    )

  }

}
