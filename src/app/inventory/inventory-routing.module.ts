import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { ClaseNominaComponent } from './clase-nomina/clase-nomina.component';
import { ListClaseNominaComponent } from './claseNomina/list-clase-nomina/list-clase-nomina.component';
import { CreateClaseNominaComponent } from './claseNomina/create-clase-nomina/create-clase-nomina.component';
import { ConceptoComponent } from './concepto/concepto.component';
import { ListConceptsComponent } from './concepto/list-concepts/list-concepts.component';
import { CreateConceptComponent } from './concepto/create-concept/create-concept.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent,
    children: [
      {
        path: 'list',
        component: ListEmployeesComponent
      },
      {
        path: 'add',
        component: EmployeeComponent
      },
     { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
  {
    path: 'classPayRolls',
    component: ClaseNominaComponent,
    children: [
      {
        path: 'list',
        component: ListClaseNominaComponent
      },
      {
        path: 'add',
        component: CreateClaseNominaComponent
      },
     { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },

  {
    path: 'concepts',
    component: ConceptoComponent,
    children: [
      {
        path: 'list',
        component: ListConceptsComponent
      },
      {
        path: 'add',
        component: CreateConceptComponent
      },
     { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}