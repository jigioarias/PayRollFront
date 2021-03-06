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
import { ListPeriodoClaseComponent } from './periodosClase/list-periodo-clase/list-periodo-clase.component';
import { PeriodoClaseComponent } from './periodosClase/periodo-clase/periodo-clase.component';
import { PeriodosClaseComponent } from './periodosClase/periodos-clase.component';
import { ConceptoNominaComponent } from './conceptoNomina/concepto-nomina.component';
import { ListConceptoNominaComponent } from './conceptoNomina/list-concepto-nomina/list-concepto-nomina.component';
import { CreateConceptoNominaComponent } from './conceptoNomina/create-concepto-nomina/create-concepto-nomina.component';
import { LoadEmployeesComponent } from './employees/load-employees/load-employees.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EditClaseNominaComponent } from './claseNomina/edit-clase-nomina/edit-clase-nomina.component';
import { EditPeriodoClaseComponent } from './periodosClase/edit-periodo-clase/edit-periodo-clase.component';
import { EditConceptoNominaComponent } from './conceptoNomina/edit-concepto-nomina/edit-concepto-nomina.component';
import { AdmonReconocimientoComponent } from './reconocimiento/admon-reconocimiento/admon-reconocimiento.component';
import { ReconocimientoComponent } from './reconocimiento/reconocimiento/reconocimiento.component';

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
      {
        path: 'edit/:id',
        component: EditEmployeeComponent
      },
      {
        path: 'load',
        component: LoadEmployeesComponent
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
        path: 'edit/:id',
        component: EditClaseNominaComponent
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
  },

  {
    path: 'periods',
    component: PeriodosClaseComponent,
    children: [
      {
        path: 'list',
        component: ListPeriodoClaseComponent
      },
      {
        path: 'edit/:id',
        component: EditPeriodoClaseComponent
      },
      {
        path: 'add',
        component: PeriodoClaseComponent
      },
     { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },

  {
    path: 'conceptsPayRoll',
    component: ConceptoNominaComponent,
    children: [
      {
        path: 'list',
        component: ListConceptoNominaComponent
      },
      {
        path: 'edit/:id',
        component: EditConceptoNominaComponent
      },
      {
        path: 'add',
        component: CreateConceptoNominaComponent
      },
     { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  },
  {
    path: 'reconocimiento',
    component: AdmonReconocimientoComponent
  },

  {
    path: 'entradas',
    component: ReconocimientoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
