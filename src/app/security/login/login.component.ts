import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/general/shared/login.service';
import { User } from 'src/app/general/shared/user';


@Component({
  selector: 'ho-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  

  constructor(private formBuilder: FormBuilder,  private router: Router, private loginService :LoginService) {}

  ngOnInit() {
   
    this.loginForm = this.formBuilder.group({
      user: [null, Validators.email],
      password: [null, Validators.required]
    });
  }

  login() {

    let user :User={
      user:this.loginForm.get('user').value,
      password:this.loginForm.get('password').value,
      email:this.loginForm.get('user').value,
      enterprise :1
    }

    if(!this.loginForm.invalid){
        let usuarioLogeado =  
        this.loginService.loginIn(user).subscribe((data)=>{
          console.log('el usuario es ',data);
          if(data!=null){
            localStorage.setItem('user',data.email);
            this.router.navigate(['/app']);
          }else{
            this.error =  'Usuario no valido';
          }
        },(error)=>{
          this.error  = error;
        }
        );     
      
       
    }else{
    
      this.error= 'Los datos esta invalidos'

    }

  }
  external() {
    this.router.navigate(['/']);
  }
}
