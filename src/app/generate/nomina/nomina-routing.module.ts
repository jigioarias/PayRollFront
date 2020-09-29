import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NominaComponent } from './nomina.component';
import { GenerateNominaComponent } from './generate-nomina/generate-nomina.component';
import { VacationsComponent } from './novedades/vacations/vacations.component';
import { ListRequestVacationsComponent } from './novedades/vacations/list-request-vacations/list-request-vacations.component';
import { ListLeavesComponent } from './novedades/leaves/list-leaves/list-leaves.component';
import { ListInabilitiesComponent } from './novedades/list-inabilities/list-inabilities.component';
import { ListLoansComponent } from './novedades/list-loans/list-loans.component';
import { RegisterComponent } from './novedades/register/register.component';

const routes: Routes = [
  {
    path: 'payroll',
    component: NominaComponent,
    children: [
      {
        path: 'generate',
        component: GenerateNominaComponent
      },
      {
        path: 'listVacations',
        component: ListRequestVacationsComponent
       // component: VacationsComponent
      },
      {
        path: 'listLeaves',
        component: ListLeavesComponent
       // component: VacationsComponent
      },

      {
        path: 'listInabilities', 
        component: ListInabilitiesComponent
       // component: VacationsComponent
      }, 
      {
        path: 'listLoans', 
        component: ListLoansComponent
       // component: VacationsComponent
      }, 

      {
        path: 'extraHours', 
        component: RegisterComponent
       // component: VacationsComponent
      }, 
      {
     path: 'requestVacations/:id',
        component: VacationsComponent
      },
     { path: '', redirectTo: 'generate', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule {}
