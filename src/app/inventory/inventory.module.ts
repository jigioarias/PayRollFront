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
import { ListPeriodoClaseComponent } from './periodosClase/list-periodo-clase/list-periodo-clase.component';
import { PeriodosClaseComponent } from './periodosClase/periodos-clase.component';
import { PeriodoClaseComponent } from './periodosClase/periodo-clase/periodo-clase.component';
import { EditPeriodoClaseComponent } from './periodosClase/edit-periodo-clase/edit-periodo-clase.component';
import { CreateConceptoNominaComponent } from './conceptoNomina/create-concepto-nomina/create-concepto-nomina.component';
import { ListConceptoNominaComponent } from './conceptoNomina/list-concepto-nomina/list-concepto-nomina.component';
import { ConceptoNominaComponent } from './conceptoNomina/concepto-nomina.component';
import { ActiveNoActivePipe } from '../general/shared/pipes/active-no-active.pipe';
import { LoadEmployeesComponent } from './employees/load-employees/load-employees.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EditClaseNominaComponent } from './claseNomina/edit-clase-nomina/edit-clase-nomina.component';
import { EditConceptoNominaComponent } from './conceptoNomina/edit-concepto-nomina/edit-concepto-nomina.component';
import { SharingGeneralModule } from '../general/shared/sharing-general/sharing-general.module';



@NgModule({
  
  declarations: [
    
    EmployeeComponent, ListEmployeesComponent, EmployeesComponent, ClaseNominaComponent, ConceptoComponent, ListClaseNominaComponent, CreateNominaComponent, CreateConceptComponent, ListConceptsComponent, CreateClaseNominaComponent, PeriodoClaseComponent, ListPeriodoClaseComponent, PeriodosClaseComponent, EditPeriodoClaseComponent, ConceptoNominaComponent, CreateConceptoNominaComponent, ListConceptoNominaComponent, LoadEmployeesComponent, EditEmployeeComponent, EditClaseNominaComponent, EditConceptoNominaComponent],

  imports: [
    CommonModule, ReactiveFormsModule, MaterialModule, InventoryRoutingModule,
    SharingGeneralModule

  ],
  
})
export class InventoryModule { }
