import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SecurityComponent } from './security/security.component';

const routesLogin: Routes = [
  {
    path: 'login',
    component: SecurityComponent,
    children: [{ path: '', component: LoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routesLogin)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
