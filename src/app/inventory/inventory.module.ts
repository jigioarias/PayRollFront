import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../general/material/material.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { EmployeeComponent } from './employees/employee/employee.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { EmployeesComponent } from './employees/employees.component';
import { ClaseNominaComponent } from './clase-nomina/clase-nomina.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { ListClaseNominaComponent } from './claseNomina/list-clase-nomina/list-clase-nomina.component';
import { CreateNominaComponent } from './claseNomina/create-nomina/create-nomina.component';
import { CreateConceptComponent } from './concepto/create-concept/create-concept.component';
import { ListConceptsComponent } from './concepto/list-concepts/list-concepts.component';
import { CreateClaseNominaComponent } from './claseNomina/create-clase-nomina/create-clase-nomina.component';



@NgModule({
  
  declarations: [EmployeeComponent, ListEmployeesComponent, EmployeesComponent, ClaseNominaComponent, ConceptoComponent, ListClaseNominaComponent, CreateNominaComponent, CreateConceptComponent, ListConceptsComponent, CreateClaseNominaComponent],

  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule, InventoryRoutingModule
  ]
})
export class InventoryModule { }