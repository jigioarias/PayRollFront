import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { EmployeeComponent } from './employees/employee/employee.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { EmployeesComponent } from './employees/employees.component';



@NgModule({
  
  declarations: [EmployeeComponent, ListEmployeesComponent, EmployeesComponent],

  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule, InventoryRoutingModule
  ]
})
export class InventoryModule { }
