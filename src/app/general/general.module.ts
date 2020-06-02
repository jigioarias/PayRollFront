
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material/material.module';
import { PipeSalaryTypePipe } from './shared/pipes/pipe-salary-type.pipe';



@NgModule({
  declarations: [HomeComponent,MenuComponent, PipeSalaryTypePipe],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ]
})
export class GeneralModule { }
