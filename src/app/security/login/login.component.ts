import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'ho-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  

  constructor(private formBuilder: FormBuilder,  private router: Router) {}

  ngOnInit() {
   
    this.loginForm = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    this.router.navigate(['/app']);

  }
  external() {
    this.router.navigate(['/']);
  }
}
