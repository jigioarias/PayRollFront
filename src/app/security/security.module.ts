import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { SecurityRoutingModule } from './security-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SecurityComponent } from './security/security.component';



@NgModule({
  declarations: [LoginComponent, SecurityComponent],
  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule, SecurityRoutingModule, HttpClientModule
  ],
exports:[LoginComponent]

})
export class SecurityModule { }
